const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  const now = new Date();

  const events = [
    {
      homeTeam: 'Real Madrid',
      awayTeam: 'Manchester City',
      leagueName: 'UEFA Champions League',
      startTime: new Date(now.getTime() - 24 * 60 * 60 * 1000),
      status: 'FINISHED',
      homeScore: 1,
      awayScore: 2,
    },
    {
      homeTeam: 'Bayern Munich',
      awayTeam: 'Inter Milan',
      leagueName: 'UEFA Champions League',
      startTime: new Date(now.getTime() - 24 * 60 * 60 * 1000),
      status: 'FINISHED',
      homeScore: 2,
      awayScore: 3,
    },
    {
      homeTeam: 'Barcelona',
      awayTeam: 'PSG',
      leagueName: 'UEFA Champions League',
      startTime: new Date(now.getTime() - 24 * 60 * 60 * 1000),
      status: 'FINISHED',
      homeScore: 3,
      awayScore: 2,
    },
    {
      homeTeam: 'Arsenal',
      awayTeam: 'Napoli',
      leagueName: 'UEFA Champions League',
      startTime: new Date(now.getTime() - 48 * 60 * 60 * 1000),
      status: 'FINISHED',
      homeScore: 1,
      awayScore: 0,
    },
    {
      homeTeam: 'Atletico Madrid',
      awayTeam: 'Benfica',
      leagueName: 'UEFA Champions League',
      startTime: new Date(now.getTime() + 4 * 60 * 60 * 1000),
      status: 'SCHEDULED',
      homeScore: null,
      awayScore: null,
    },
    {
      homeTeam: 'Juventus',
      awayTeam: 'Dortmund',
      leagueName: 'UEFA Champions League',
      startTime: new Date(now.getTime() - 12 * 60 * 60 * 1000),
      status: 'CANCELED',
      homeScore: null,
      awayScore: null,
    },
  ];

  await prisma.sportEvent.deleteMany();
  await prisma.sportEvent.createMany({ data: events });
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
