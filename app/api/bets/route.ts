import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';

const bodySchema = z.object({
  userId: z.string().min(1),
  eventId: z.string().min(1),
  selection: z.enum(['HOME', 'AWAY', 'DRAW']),
  amount: z.number().positive(),
  mode: z.enum(['direct', 'random']),
  opponentCode: z.string().optional().nullable(),
});

export async function POST(req: NextRequest) {
  const json = await req.json().catch(() => null);
  const parsed = bodySchema.safeParse(json);

  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
  }

  const { userId, eventId, selection, amount, mode, opponentCode } =
    parsed.data;

  if (mode === 'direct' && !opponentCode) {
    return NextResponse.json(
      { error: 'Missing opponent code' },
      { status: 400 },
    );
  }

  const creator = await prisma.user.findUnique({
    where: { id: userId },
    include: { wallet: true },
  });

  if (!creator || !creator.wallet) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  const balance = Number(creator.wallet.balance);
  if (balance < amount) {
    return NextResponse.json(
      { error: 'Insufficient balance' },
      { status: 400 },
    );
  }

  const acceptor =
    mode === 'direct'
      ? await prisma.user.findUnique({ where: { code: opponentCode! } })
      : null;

  if (mode === 'direct' && !acceptor) {
    return NextResponse.json(
      { error: 'Opponent not found' },
      { status: 404 },
    );
  }

  const amountDecimal = new Prisma.Decimal(amount);
  const feeDecimal = new Prisma.Decimal(amount * 2 * 0.05);

  const result = await prisma.$transaction(async (tx) => {
    const offer = await tx.betOffer.create({
      data: {
        creatorId: creator.id,
        eventId,
        selection,
        amount: amountDecimal,
        status: mode === 'direct' && acceptor ? 'MATCHED' : 'OPEN',
      },
    });

    const match =
      mode === 'direct' && acceptor
        ? await tx.betMatch.create({
            data: {
              offerId: offer.id,
              creatorId: creator.id,
              acceptorId: acceptor.id,
              creatorAmount: amountDecimal,
              acceptorAmount: amountDecimal,
              platformFeeTotal: feeDecimal,
              status: 'ACTIVE',
            },
          })
        : null;

    const wallet = await tx.wallet.update({
      where: { id: creator.wallet!.id },
      data: { balance: { decrement: amountDecimal } },
    });

    await tx.transaction.create({
      data: {
        userId: creator.id,
        walletId: creator.wallet!.id,
        type: 'BET_LOCK',
        status: 'COMPLETED',
        amount: amountDecimal,
        offerId: offer.id,
        matchId: match?.id ?? null,
      },
    });

    return { offer, match, wallet };
  });

  return NextResponse.json({
    offerId: result.offer.id,
    matchId: result.match?.id ?? null,
    offerStatus: result.offer.status,
    balance: Number(result.wallet.balance),
  });
}
