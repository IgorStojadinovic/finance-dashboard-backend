/*
  Warnings:

  - Added the required column `color` to the `RecurringBill` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "RecurringBill" ADD COLUMN     "color" TEXT NOT NULL;
