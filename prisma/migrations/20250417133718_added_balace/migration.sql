/*
  Warnings:

  - You are about to drop the column `currentBalance` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `expenses` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `income` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "currentBalance",
DROP COLUMN "expenses",
DROP COLUMN "income";

-- CreateTable
CREATE TABLE "Balance" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "balance" DOUBLE PRECISION NOT NULL,
    "income" DOUBLE PRECISION NOT NULL,
    "expenses" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Balance_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Balance" ADD CONSTRAINT "Balance_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
