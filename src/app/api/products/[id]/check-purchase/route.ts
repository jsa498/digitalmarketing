import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import prisma from '@/lib/prisma';
import { NextRequest } from 'next/server';

type Params = {
  params: {
    id: string;
  };
};

export async function GET(
  request: NextRequest,
  { params }: Params
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json(
        { purchased: false },
        { status: 401 }
      );
    }

    const id = params.id;

    // Check if user has purchased the product
    const purchase = await prisma.purchase.findFirst({
      where: {
        userId: session.user.id,
        productId: id,
        status: 'completed',
      },
    });

    return NextResponse.json({ purchased: !!purchase });
  } catch (error) {
    console.error('Error checking purchase status:', error);
    return NextResponse.json(
      { error: 'An error occurred while checking purchase status' },
      { status: 500 }
    );
  }
} 