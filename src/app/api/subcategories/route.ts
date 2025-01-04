import { NextRequest, NextResponse } from 'next/server';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const categoryId = searchParams.get('categoryId');

    const subcategories = await prisma.subcategory.findMany({
      where: {
        Categories: {
          some: {
            categoryId: categoryId || '',
          },
        },
      },
    });

    // Ensure that the response is always an array, even if the database returns null
    return NextResponse.json(subcategories || [], { status: 200 });
  } catch (error: any) {
    console.log('Error fetching subcategories:', error);

    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error';

    return NextResponse.json(
      { message: 'Internal Server Error', error: errorMessage },
      { status: 500 },
    );
  }
}
