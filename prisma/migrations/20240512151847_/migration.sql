/*
  Warnings:

  - You are about to drop the column `calculatorId` on the `City` table. All the data in the column will be lost.
  - Added the required column `cityId` to the `Calculator` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "City" DROP CONSTRAINT "City_calculatorId_fkey";

-- AlterTable
ALTER TABLE "Calculator" ADD COLUMN     "cityId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "City" DROP COLUMN "calculatorId";

-- AddForeignKey
ALTER TABLE "Calculator" ADD CONSTRAINT "Calculator_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "City"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
