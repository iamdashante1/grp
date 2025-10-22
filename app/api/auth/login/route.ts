import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import dbConnect from '@/lib/db/connection';
import User from '@/lib/models/User';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    
    const body = await request.json();
    const { email, password } = body;

    // Validation
    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Find user with password field
    const user = await User.findOne({ email: email.toLowerCase() })
      .select('+password')
      .populate('role');

    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Check password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { success: false, message: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Generate JWT token
    const token = jwt.sign(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      { userId: String(user._id), email: user.email, role: (user.role as any)?.name },
      JWT_SECRET
    );

    // Remove password from response
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const userResponse: any = user.toObject();
    delete userResponse.password;

    return NextResponse.json({
      success: true,
      message: 'Login successful',
      data: {
        user: userResponse,
        token
      }
    });

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Login failed';
    console.error('Login error:', error);
    return NextResponse.json(
      { success: false, message: errorMessage },
      { status: 500 }
    );
  }
}
