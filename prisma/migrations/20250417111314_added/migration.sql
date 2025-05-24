/*
  Warnings:

  - Added the required column `hex` to the `Budget` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Budget" ADD COLUMN     "hex" TEXT NOT NULL,
ALTER COLUMN "limmit" DROP DEFAULT;
