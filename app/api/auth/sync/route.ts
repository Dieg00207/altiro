import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';

const bodySchema = z.object({
  email: z.string().email(),
  name: z.string().optional().nullable(),
});

function generateCode() {
  const num = Math.floor(1000 + Math.random() * 9000);
  return `PB-${num}-HN`;
}

export async function POST(req: NextRequest) {
  const json = await req.json().catch(() => null);
  const parsed = bodySchema.safeParse(json);

  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Invalid payload' },
      { status: 400 },
    );
  }

  const { email, name } = parsed.data;

  const existing = await prisma.user.findUnique({
    where: { email },
    include: { wallet: true },
  });

  if (existing) {
    const updated = await prisma.user.update({
      where: { id: existing.id },
      data: {
        name: existing.name || name || undefined,
      },
      include: { wallet: true },
    });

    return NextResponse.json({
      user: {
        id: updated.id,
        email: updated.email,
        name: updated.name,
        code: updated.code,
        kycVerified: updated.kycVerified,
        balance: Number(updated.wallet?.balance ?? 0),
        createdAt: updated.createdAt.toISOString(),
      },
    });
  }

  const created = await prisma.user.create({
    data: {
      email,
      name: name || null,
      code: generateCode(),
      kycVerified: false,
      wallet: {
        create: {
          balance: 5000,
        },
      },
    },
    include: { wallet: true },
  });

  return NextResponse.json({
    user: {
      id: created.id,
      email: created.email,
      name: created.name,
      code: created.code,
      kycVerified: created.kycVerified,
      balance: Number(created.wallet?.balance ?? 0),
      createdAt: created.createdAt.toISOString(),
    },
  });
}
