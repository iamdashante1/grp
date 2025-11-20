import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db/connection';
import User from '@/lib/models/User';
import Role from '@/lib/models/Role';
import { signToken } from '@/lib/utils/jwt';

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const body = await req.json();
    const { fullName, email, password, phone } = body || {};
    const roleName = (body?.roleName || body?.role) as string | undefined;

    if (!fullName || !email || !password || !phone) {
      return NextResponse.json(
        { success: false, message: 'fullName, email, phone and password are required' },
        { status: 400 }
      );
    }

    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return NextResponse.json(
        { success: false, message: 'Email already in use' },
        { status: 409 }
      );
    }

    const targetRoleName: string = (roleName || 'donor').toLowerCase();
    let role = await Role.findOne({ name: targetRoleName });

    // If role not found and is an allowed enum, create minimal role
    const allowedRoles = ['admin', 'donor', 'nurse', 'lab_tech', 'receptionist', 'hospital'];
    if (!role) {
      if (!allowedRoles.includes(targetRoleName)) {
        return NextResponse.json(
          { success: false, message: `Invalid role: ${targetRoleName}` },
          { status: 400 }
        );
      }
      role = await Role.create({ name: targetRoleName, permissions: [], description: `${targetRoleName} role` });
    }

    const user = await User.create({
      fullName,
      email: email.toLowerCase(),
      password,
      phone,
      role: role._id,
    });

    const safeUser = await User.findById((user as any)._id).select('-password').populate('role');

    const token = signToken({ userId: String((user as any)._id), role: role.name });

    return NextResponse.json({
      success: true,
      message: 'Registration successful',
      data: { user: safeUser, token },
    }, { status: 201 });

  } catch (error) {
    const message = error instanceof Error ? error.message : 'Registration failed';
    console.error('Register error:', error);
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
