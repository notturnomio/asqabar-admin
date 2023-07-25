import prismadb from '@/lib/prismadb';
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { label, imageUrl } = body;

    if (!userId) return new NextResponse('Unauthenticated', { status: 403 });

    if (!label) return new NextResponse('Label is required', { status: 400 });

    if (!imageUrl)
      return new NextResponse('Image is required', { status: 400 });

    if (!params.storeId)
      return new NextResponse('Store id is required', { status: 400 });

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse('Unauthorized', { status: 403 });
    }

    const banner = await prismadb.banner.create({
      data: {
        label,
        imageUrl,
        storeId: params.storeId,
      },
    });

    return NextResponse.json(banner);
  } catch (error) {
    console.log('[BANNERS_POST_ERROR]', error);
    return new NextResponse('internal server error', { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    if (!params.storeId)
      return new NextResponse('Store id is required', { status: 400 });

    const banners = await prismadb.banner.findMany({
      where: {
        storeId: params.storeId,
      },
    });

    return NextResponse.json(banners);
  } catch (error) {
    console.log('[BANNERS_GET_ERROR]', error);
    return new NextResponse('internal server error', { status: 500 });
  }
}
