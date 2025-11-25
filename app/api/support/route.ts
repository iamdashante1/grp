import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db/connection';
import ContactMessage from '@/lib/models/ContactMessage';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    const {
      firstName,
      lastName,
      email,
      phone,
      subject,
      message,
      userId,
    } = body || {};

    if (
      !firstName?.trim()
      || !lastName?.trim()
      || !email?.trim()
      || !subject?.trim()
      || !message?.trim()
    ) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 },
      );
    }

    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: 'Invalid email address' },
        { status: 400 },
      );
    }

    const contactMessage = await ContactMessage.create({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim().toLowerCase(),
      phone: phone?.trim(),
      subject: subject.trim(),
      message: message.trim(),
      status: 'new',
      priority: subject === 'emergency' ? 'high' : 'normal',
      source: 'web',
      userId: userId ? userId : undefined,
      metadata: {
        userAgent: req.headers.get('user-agent') ?? undefined,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Message received',
        data: {
          id: contactMessage._id,
          referenceId: contactMessage.referenceId,
        },
      },
      { status: 201 },
    );
  } catch (error) {
    console.error('Contact form error:', error);
    const message = error instanceof Error ? error.message : 'Unable to submit message';
    return NextResponse.json(
      { success: false, message },
      { status: 500 },
    );
  }
}
