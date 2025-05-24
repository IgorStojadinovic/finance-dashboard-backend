/*
  Warnings:

  - You are about to drop the column `limmit` on the `Budget` table. All the data in the column will be lost.
  - You are about to drop the column `maximum` on the `Budget` table. All the data in the column will be lost.
  - Added the required column `progressBar` to the `Budget` table without a default value. This is not possible if the table is not empty.
  - Added the required column `spending_limit` to the `Budget` table without a default value. This is not possible if the table is not empty.
  - Added the required column `spent` to the `Budget` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Budget" DROP COLUMN "limmit",
DROP COLUMN "maximum",
ADD COLUMN     "progressBar" TEXT NOT NULL,
ADD COLUMN     "spending_limit" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "spent" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "budgetId" TEXT;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_budgetId_fkey" FOREIGN KEY ("budgetId") REFERENCES "Budget"("id") ON DELETE SET NULL ON UPDATE CASCADE;
