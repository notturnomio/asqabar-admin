import prismadb from '@/lib/prismadb';
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

export async function GET(
  req: Request,
  { params }: { params: { bannerId: string } }
) {
  try {
    if (!params.bannerId)
      return new NextResponse('Store id is required', { status: 400 });

    const banner = await prismadb.banner.findUnique({
      where: {
        id: params.bannerId,
      },
    });

    return NextResponse.json(banner);
  } catch (error) {
    console.log('[BANNER_GET_ERROR]', error);
    return new NextResponse('internal server error', { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; bannerId: string } }
) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { label, imageUrl } = body;

    if (!userId) return new NextResponse('Unauthenticated', { status: 403 });

    if (!label) return new NextResponse('Label is required', { status: 400 });

    if (!imageUrl)
      return new NextResponse('Image is required', { status: 400 });

    if (!params.bannerId)
      return new NextResponse('Banner id is required', { status: 400 });

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse('Unauthorized', { status: 403 });
    }

    const banner = await prismadb.banner.updateMany({
      where: {
        id: params.bannerId,
      },
      data: {
        label,
        imageUrl,
      },
    });

    return NextResponse.json(banner);
  } catch (error) {
    console.log('[BANNER_PATCH_ERROR]', error);
    return new NextResponse('internal server error', { status: 500 });
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: { storeId: string; bannerId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) return new NextResponse('Unauthorized', { status: 403 });

    if (!params.bannerId)
      return new NextResponse('Banner id is required', { status: 400 });

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse('Unauthorized', { status: 403 });
    }

    const banner = await prismadb.banner.deleteMany({
      where: {
        id: params.bannerId,
      },
    });

    return NextResponse.json(banner);
  } catch (error) {
    console.log('[BANNER_DELETE_ERROR]', error);
    return new NextResponse('internal server error', { status: 500 });
  }
}
