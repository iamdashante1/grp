import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db/connection';
import User from '@/lib/models/User';
import { signToken } from '@/lib/utils/jwt';

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const body = await req.json();
    const { email, password } = body || {};

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: 'email and password are required' },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email: email.toLowerCase() }).select('+password').populate('role');
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Invalid credentials' },
        { status: 401 }
      );
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return NextResponse.json(
        { success: false, message: 'Invalid credentials' },
        { status: 401 }
      );
    }

    await user.updateLastLogin();

    const safeUser = await User.findById((user as any)._id).select('-password').populate('role');
    const token = signToken({ userId: String((user as any)._id), role: (user.role as any)?.name });

    return NextResponse.json({
      success: true,
      message: 'Login successful',
      data: { user: safeUser, token },
    });

  } catch (error) {
    const message = error instanceof Error ? error.message : 'Login failed';
    console.error('Login error:', error);
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
