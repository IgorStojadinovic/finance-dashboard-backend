/*
  Warnings:

  - Added the required column `currentBalance` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `expenses` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `income` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "currentBalance" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "expenses" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "income" DOUBLE PRECISION NOT NULL;
