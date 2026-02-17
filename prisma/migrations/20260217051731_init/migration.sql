-- CreateEnum
CREATE TYPE "TransactionType" AS ENUM ('DEPOSIT', 'WITHDRAWAL', 'BET_LOCK', 'BET_RELEASE', 'PLATFORM_FEE');

-- CreateEnum
CREATE TYPE "TransactionStatus" AS ENUM ('PENDING', 'COMPLETED', 'FAILED');

-- CreateEnum
CREATE TYPE "BetOfferStatus" AS ENUM ('OPEN', 'MATCHED', 'CANCELED');

-- CreateEnum
CREATE TYPE "BetMatchStatus" AS ENUM ('ACTIVE', 'SETTLED', 'VOID');

-- CreateEnum
CREATE TYPE "BetResult" AS ENUM ('CREATOR_WIN', 'ACCEPTOR_WIN', 'PUSH');

-- CreateEnum
CREATE TYPE "EventStatus" AS ENUM ('SCHEDULED', 'LIVE', 'FINISHED', 'CANCELED');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "walletId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Wallet" (
    "id" TEXT NOT NULL,
    "balance" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "currency" TEXT NOT NULL DEFAULT 'USD',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Wallet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transaction" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "walletId" TEXT NOT NULL,
    "type" "TransactionType" NOT NULL,
    "status" "TransactionStatus" NOT NULL DEFAULT 'PENDING',
    "amount" DECIMAL(65,30) NOT NULL,
    "offerId" TEXT,
    "matchId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SportEvent" (
    "id" TEXT NOT NULL,
    "homeTeam" TEXT NOT NULL,
    "awayTeam" TEXT NOT NULL,
    "leagueName" TEXT NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "status" "EventStatus" NOT NULL DEFAULT 'SCHEDULED',
    "homeScore" INTEGER,
    "awayScore" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SportEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BetOffer" (
    "id" TEXT NOT NULL,
    "creatorId" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "selection" TEXT NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,
    "status" "BetOfferStatus" NOT NULL DEFAULT 'OPEN',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BetOffer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BetMatch" (
    "id" TEXT NOT NULL,
    "offerId" TEXT NOT NULL,
    "creatorId" TEXT NOT NULL,
    "acceptorId" TEXT NOT NULL,
    "creatorAmount" DECIMAL(65,30) NOT NULL,
    "acceptorAmount" DECIMAL(65,30) NOT NULL,
    "platformFeeTotal" DECIMAL(65,30) NOT NULL,
    "winnerId" TEXT,
    "result" "BetResult",
    "status" "BetMatchStatus" NOT NULL DEFAULT 'ACTIVE',
    "settledAt" TIMESTAMP(3),

    CONSTRAINT "BetMatch_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserMatchHistory" (
    "id" TEXT NOT NULL,
    "user1Id" TEXT NOT NULL,
    "user2Id" TEXT NOT NULL,
    "betMatchId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserMatchHistory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_walletId_key" ON "User"("walletId");

-- CreateIndex
CREATE INDEX "User_email_idx" ON "User"("email");

-- CreateIndex
CREATE INDEX "Transaction_userId_idx" ON "Transaction"("userId");

-- CreateIndex
CREATE INDEX "Transaction_walletId_idx" ON "Transaction"("walletId");

-- CreateIndex
CREATE INDEX "Transaction_type_status_idx" ON "Transaction"("type", "status");

-- CreateIndex
CREATE INDEX "Transaction_offerId_idx" ON "Transaction"("offerId");

-- CreateIndex
CREATE INDEX "Transaction_matchId_idx" ON "Transaction"("matchId");

-- CreateIndex
CREATE INDEX "SportEvent_status_idx" ON "SportEvent"("status");

-- CreateIndex
CREATE INDEX "SportEvent_startTime_idx" ON "SportEvent"("startTime");

-- CreateIndex
CREATE INDEX "SportEvent_leagueName_idx" ON "SportEvent"("leagueName");

-- CreateIndex
CREATE INDEX "BetOffer_creatorId_idx" ON "BetOffer"("creatorId");

-- CreateIndex
CREATE INDEX "BetOffer_eventId_idx" ON "BetOffer"("eventId");

-- CreateIndex
CREATE INDEX "BetOffer_status_idx" ON "BetOffer"("status");

-- CreateIndex
CREATE UNIQUE INDEX "BetMatch_offerId_key" ON "BetMatch"("offerId");

-- CreateIndex
CREATE INDEX "BetMatch_creatorId_idx" ON "BetMatch"("creatorId");

-- CreateIndex
CREATE INDEX "BetMatch_acceptorId_idx" ON "BetMatch"("acceptorId");

-- CreateIndex
CREATE INDEX "BetMatch_status_idx" ON "BetMatch"("status");

-- CreateIndex
CREATE INDEX "UserMatchHistory_user1Id_idx" ON "UserMatchHistory"("user1Id");

-- CreateIndex
CREATE INDEX "UserMatchHistory_user2Id_idx" ON "UserMatchHistory"("user2Id");

-- CreateIndex
CREATE INDEX "UserMatchHistory_betMatchId_idx" ON "UserMatchHistory"("betMatchId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_walletId_fkey" FOREIGN KEY ("walletId") REFERENCES "Wallet"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_walletId_fkey" FOREIGN KEY ("walletId") REFERENCES "Wallet"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_offerId_fkey" FOREIGN KEY ("offerId") REFERENCES "BetOffer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "BetMatch"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BetOffer" ADD CONSTRAINT "BetOffer_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BetOffer" ADD CONSTRAINT "BetOffer_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "SportEvent"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BetMatch" ADD CONSTRAINT "BetMatch_offerId_fkey" FOREIGN KEY ("offerId") REFERENCES "BetOffer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BetMatch" ADD CONSTRAINT "BetMatch_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BetMatch" ADD CONSTRAINT "BetMatch_acceptorId_fkey" FOREIGN KEY ("acceptorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserMatchHistory" ADD CONSTRAINT "UserMatchHistory_user1Id_fkey" FOREIGN KEY ("user1Id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserMatchHistory" ADD CONSTRAINT "UserMatchHistory_user2Id_fkey" FOREIGN KEY ("user2Id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserMatchHistory" ADD CONSTRAINT "UserMatchHistory_betMatchId_fkey" FOREIGN KEY ("betMatchId") REFERENCES "BetMatch"("id") ON DELETE CASCADE ON UPDATE CASCADE;
