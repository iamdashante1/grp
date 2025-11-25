import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db/connection';
import Request from '@/lib/models/Request';

const BLOOD_TYPES = new Set(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']);
const URGENCY_VALUES = new Set(['routine', 'urgent', 'emergency']);
const REASON_VALUES = new Set([
  'surgery',
  'trauma',
  'cancer_treatment',
  'chronic_anemia',
  'childbirth',
  'organ_transplant',
  'emergency',
  'other',
]);

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const urgencyPriority: Record<string, number> = {
  emergency: 5,
  urgent: 3,
  routine: 1,
};

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    const {
      patientName,
      bloodType,
      unitsNeeded,
      urgency,
      reason,
      hospitalName,
      hospitalAddress,
      contactName,
      contactPhone,
      contactEmail,
      additionalNotes,
      requiredBy,
      userId,
    } = body || {};

    if (
      !patientName?.trim()
      || !bloodType
      || !unitsNeeded
      || !urgency
      || !reason
      || !hospitalName?.trim()
      || !contactName?.trim()
      || !contactPhone?.trim()
      || !contactEmail?.trim()
      || !requiredBy
    ) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 },
      );
    }

    if (!BLOOD_TYPES.has(bloodType)) {
      return NextResponse.json(
        { success: false, message: 'Invalid blood type' },
        { status: 400 },
      );
    }

    if (!URGENCY_VALUES.has(urgency)) {
      return NextResponse.json(
        { success: false, message: 'Invalid urgency' },
        { status: 400 },
      );
    }

    if (!REASON_VALUES.has(reason)) {
      return NextResponse.json(
        { success: false, message: 'Invalid reason' },
        { status: 400 },
      );
    }

    const units = Number(unitsNeeded);
    if (Number.isNaN(units) || units < 1) {
      return NextResponse.json(
        { success: false, message: 'Units must be a positive number' },
        { status: 400 },
      );
    }

    if (!emailRegex.test(contactEmail)) {
      return NextResponse.json(
        { success: false, message: 'Invalid contact email' },
        { status: 400 },
      );
    }

    const requiredByDate = new Date(requiredBy);
    if (Number.isNaN(requiredByDate.getTime())) {
      return NextResponse.json(
        { success: false, message: 'Invalid required by date' },
        { status: 400 },
      );
    }

    const hospitalPayload = {
      name: hospitalName.trim(),
      contactPerson: contactName.trim(),
      phone: contactPhone.trim(),
      email: contactEmail.trim().toLowerCase(),
      address: {
        street: hospitalAddress?.street || '',
        city: hospitalAddress?.city || '',
        state: hospitalAddress?.state || '',
        zipCode: hospitalAddress?.zipCode || '',
      },
    };

    const requestDoc = await Request.create({
      hospital: hospitalPayload,
      bloodType,
      volumeRequestedMl: units * 450,
      unitsRequested: units,
      urgency,
      reason,
      patientInfo: {
        patientId: patientName.trim(),
        doctorName: contactName.trim(),
      },
      requiredBy: requiredByDate,
      priority: urgencyPriority[urgency] ?? 1,
      notes: [
        patientName ? `Patient: ${patientName.trim()}` : null,
        additionalNotes?.trim() || null,
      ].filter(Boolean).join(' | ') || undefined,
      fulfillment: {},
      communication: userId ? [{
        message: 'Request submitted via portal',
        sentBy: userId,
        type: 'update',
      }] : [],
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Request submitted',
        data: {
          requestId: requestDoc.requestId,
          status: requestDoc.status,
          priority: requestDoc.priority,
        },
      },
      { status: 201 },
    );
  } catch (error) {
    console.error('Create request error:', error);
    const message = error instanceof Error ? error.message : 'Unable to submit request';
    return NextResponse.json(
      { success: false, message },
      { status: 500 },
    );
  }
}
