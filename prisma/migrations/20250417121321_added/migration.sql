/*
  Warnings:

  - Added the required column `category` to the `RecurringBill` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "RecurringBill" ADD COLUMN     "category" TEXT NOT NULL;
