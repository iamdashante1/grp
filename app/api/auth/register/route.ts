import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import dbConnect from '@/lib/db/connection';
import User from '@/lib/models/User';
import Role from '@/lib/models/Role';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    
    const body = await request.json();
    const { name, email, password, phone, role } = body;

    // Validation
    if (!name || !email || !password) {
      return NextResponse.json(
        { success: false, message: 'Name, email, and password are required' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return NextResponse.json(
        { success: false, message: 'User already exists with this email' },
        { status: 409 }
      );
    }

    // Find or create default role
    let userRole = await Role.findOne({ name: role || 'donor' });
    if (!userRole) {
      userRole = await Role.findOne({ name: 'donor' });
    }

    // Create user
    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password,
      phone,
      role: userRole?._id
    });

    // Generate JWT token
    const token = jwt.sign(
      { userId: String(user._id), email: user.email, role: userRole?.name },
      JWT_SECRET
    );

    // Remove password from response
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const userResponse: any = user.toObject();
    delete userResponse.password;

    return NextResponse.json({
      success: true,
      message: 'User registered successfully',
      data: {
        user: userResponse,
        token
      }
    }, { status: 201 });

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Registration failed';
    console.error('Registration error:', error);
    return NextResponse.json(
      { success: false, message: errorMessage },
      { status: 500 }
    );
  }
}
