import { NextRequest, NextResponse } from 'next/server';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function create(req: NextRequest, res: NextResponse) {
  try {
    const body = await req.json();
    const { name, createdAt } = body;

    if (!name || !createdAt) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 },
      );
    }

    const specialization = await prisma.specialization.create({
      data: {
        name,
        createdAt,
        updatedAt: createdAt,
      },
    });

    return NextResponse.json(specialization, { status: 201 });
  } catch (error: Error | unknown) {
    console.error('Error creating specialization:', error);
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { message: 'Internal Server Error', error: errorMessage },
      { status: 500 },
    );
  }
}
