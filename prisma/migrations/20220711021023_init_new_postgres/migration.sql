-- CreateEnum
CREATE TYPE "Categories_clasification" AS ENUM ('idea', 'evaluation');

-- CreateEnum
CREATE TYPE "Ideas_status" AS ENUM ('funded', 'canceled', 'panding');

-- CreateEnum
CREATE TYPE "Users_role" AS ENUM ('admin', 'umkm');

-- CreateEnum
CREATE TYPE "Month" AS ENUM ('januari', 'februari', 'maret', 'april', 'mei', 'juni', 'juli', 'agustus', 'september', 'oktober', 'november', 'desember');

-- CreateTable
CREATE TABLE "Categories" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "clasification" "Categories_clasification" DEFAULT 'idea',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Evaluation_surveis" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "done_at" TIME(0) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "EvaluationId" INTEGER,
    "IdeaId" INTEGER,

    CONSTRAINT "Evaluation_surveis_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Evaluations" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "umkm_name" VARCHAR(255) NOT NULL,
    "location" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Evaluations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Files" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "url" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "ideasId" INTEGER,
    "evaluation_surveisId" INTEGER,
    "evaluationsId" INTEGER,
    "financial_reportsId" INTEGER,

    CONSTRAINT "Files_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Financial_reports" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "profit" INTEGER NOT NULL,
    "fund" INTEGER NOT NULL,
    "year" INTEGER,
    "month" "Month" DEFAULT 'januari',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "IdeaId" INTEGER,

    CONSTRAINT "Financial_reports_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Fund_transactions" (
    "id" SERIAL NOT NULL,
    "total" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "IdeaId" INTEGER,

    CONSTRAINT "Fund_transactions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ideas" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    "required_fund" INTEGER NOT NULL,
    "location" TEXT NOT NULL,
    "status" "Ideas_status" NOT NULL DEFAULT 'panding',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "UserId" INTEGER,
    "CategoryId" INTEGER,
    "EvaluationSurveiId" INTEGER,

    CONSTRAINT "Ideas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reject_fund_reasons" (
    "id" SERIAL NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "IdeaId" INTEGER,

    CONSTRAINT "Reject_fund_reasons_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Users" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "username" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "role" "Users_role" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Evaluation_surveis_IdeaId_key" ON "Evaluation_surveis"("IdeaId");

-- CreateIndex
CREATE INDEX "EvaluationId" ON "Evaluation_surveis"("EvaluationId");

-- CreateIndex
CREATE INDEX "IdeaId_" ON "Evaluation_surveis"("IdeaId");

-- CreateIndex
CREATE INDEX "IdeaId_to_report" ON "Financial_reports"("IdeaId");

-- CreateIndex
CREATE INDEX "IdeaId_to_fund" ON "Fund_transactions"("IdeaId");

-- CreateIndex
CREATE INDEX "CategoryId" ON "Ideas"("CategoryId");

-- CreateIndex
CREATE INDEX "UserId" ON "Ideas"("UserId");

-- CreateIndex
CREATE INDEX "IdeaId_to_reject" ON "Reject_fund_reasons"("IdeaId");

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- AddForeignKey
ALTER TABLE "Evaluation_surveis" ADD CONSTRAINT "Evaluation_surveis_ibfk_1" FOREIGN KEY ("EvaluationId") REFERENCES "Evaluations"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Evaluation_surveis" ADD CONSTRAINT "Evaluation_surveis_ibfk_2" FOREIGN KEY ("IdeaId") REFERENCES "Ideas"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Files" ADD CONSTRAINT "Files_evaluation_surveisId_fkey" FOREIGN KEY ("evaluation_surveisId") REFERENCES "Evaluation_surveis"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Files" ADD CONSTRAINT "Files_evaluationsId_fkey" FOREIGN KEY ("evaluationsId") REFERENCES "Evaluations"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Files" ADD CONSTRAINT "Files_financial_reportsId_fkey" FOREIGN KEY ("financial_reportsId") REFERENCES "Financial_reports"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Files" ADD CONSTRAINT "Files_ideasId_fkey" FOREIGN KEY ("ideasId") REFERENCES "Ideas"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Financial_reports" ADD CONSTRAINT "Financial_reports_ibfk_1" FOREIGN KEY ("IdeaId") REFERENCES "Ideas"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Fund_transactions" ADD CONSTRAINT "Fund_transactions_ibfk_1" FOREIGN KEY ("IdeaId") REFERENCES "Ideas"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ideas" ADD CONSTRAINT "Ideas_ibfk_2" FOREIGN KEY ("CategoryId") REFERENCES "Categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ideas" ADD CONSTRAINT "Ideas_ibfk_1" FOREIGN KEY ("UserId") REFERENCES "Users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reject_fund_reasons" ADD CONSTRAINT "Reject_fund_reasons_ibfk_1" FOREIGN KEY ("IdeaId") REFERENCES "Ideas"("id") ON DELETE SET NULL ON UPDATE CASCADE;
