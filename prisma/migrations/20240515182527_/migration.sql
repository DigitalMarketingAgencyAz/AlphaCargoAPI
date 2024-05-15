/*
  Warnings:

  - You are about to drop the column `brand` on the `Calculator` table. All the data in the column will be lost.
  - You are about to drop the column `imported` on the `Calculator` table. All the data in the column will be lost.
  - You are about to drop the column `marked` on the `Calculator` table. All the data in the column will be lost.
  - You are about to drop the column `sewing` on the `Calculator` table. All the data in the column will be lost.
  - You are about to drop the column `shoes` on the `Calculator` table. All the data in the column will be lost.
  - Added the required column `parcelTypeId` to the `Calculator` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Calculator" DROP COLUMN "brand",
DROP COLUMN "imported",
DROP COLUMN "marked",
DROP COLUMN "sewing",
DROP COLUMN "shoes",
ADD COLUMN     "parcelTypeId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Calculator" ADD CONSTRAINT "Calculator_parcelTypeId_fkey" FOREIGN KEY ("parcelTypeId") REFERENCES "ParcelType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
