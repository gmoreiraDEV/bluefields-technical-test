-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateEnum
CREATE TYPE "RiskLevel" AS ENUM ('GREEN', 'YELLOW', 'RED');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Startup" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "segment" TEXT NOT NULL,
    "stage" TEXT NOT NULL,
    "bluefieldsOwner" TEXT NOT NULL,
    "riskLevel" "RiskLevel" NOT NULL DEFAULT 'GREEN',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Startup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StartupUpdate" (
    "id" TEXT NOT NULL,
    "startupId" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "weeklySummary" TEXT NOT NULL,
    "blockers" TEXT,
    "nextSteps" TEXT NOT NULL,
    "riskSnapshot" "RiskLevel" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "StartupUpdate_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "Startup_riskLevel_idx" ON "Startup"("riskLevel");

-- CreateIndex
CREATE INDEX "Startup_bluefieldsOwner_idx" ON "Startup"("bluefieldsOwner");

-- CreateIndex
CREATE INDEX "StartupUpdate_startupId_createdAt_idx" ON "StartupUpdate"("startupId", "createdAt");

-- AddForeignKey
ALTER TABLE "StartupUpdate" ADD CONSTRAINT "StartupUpdate_startupId_fkey" FOREIGN KEY ("startupId") REFERENCES "Startup"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StartupUpdate" ADD CONSTRAINT "StartupUpdate_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
