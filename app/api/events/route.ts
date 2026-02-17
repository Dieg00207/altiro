import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

function formatDate(date: Date) {
  return date.toISOString().slice(0, 10);
}

function formatTime(date: Date) {
  return date.toISOString().slice(11, 16);
}

function mapStatus(status: string) {
  if (status === 'LIVE') return 'live';
  if (status === 'SCHEDULED') return 'upcoming';
  return 'finished';
}

export async function GET() {
  const events = await prisma.sportEvent.findMany({
    orderBy: { startTime: 'asc' },
    include: {
      _count: { select: { offers: true } },
    },
  });

  const matches = events.map((event) => ({
    id: event.id,
    homeTeam: event.homeTeam,
    awayTeam: event.awayTeam,
    league: event.leagueName,
    leagueCountry: 'UEFA',
    date: formatDate(event.startTime),
    time: formatTime(event.startTime),
    status: mapStatus(event.status),
    score:
      event.homeScore !== null && event.awayScore !== null
        ? { home: event.homeScore, away: event.awayScore }
        : undefined,
    minute: event.status === 'LIVE' ? 55 : undefined,
    activeBets: event._count.offers,
  }));

  return NextResponse.json({ matches });
}
