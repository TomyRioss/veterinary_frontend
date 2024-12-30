import { NextRequest, NextResponse } from 'next/server';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const specializations = await prisma.specialization.findMany();

    // Ensure that the response is always an array, even if the database returns null
    return NextResponse.json(specializations || [], { status: 200 });
  } catch (error: any) {
    console.log('Error fetching specializations:', error);

    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error';

    return NextResponse.json(
      { message: 'Internal Server Error', error: errorMessage },
      { status: 500 },
    );
  }
}
