/*
  Warnings:

  - You are about to drop the column `cityId` on the `Calculator` table. All the data in the column will be lost.
  - Added the required column `cityFromId` to the `Calculator` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cityToId` to the `Calculator` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Calculator" DROP CONSTRAINT "Calculator_cityId_fkey";

-- AlterTable
ALTER TABLE "Calculator" DROP COLUMN "cityId",
ADD COLUMN     "cityFromId" INTEGER NOT NULL,
ADD COLUMN     "cityToId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Calculator" ADD CONSTRAINT "Calculator_cityFromId_fkey" FOREIGN KEY ("cityFromId") REFERENCES "City"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Calculator" ADD CONSTRAINT "Calculator_cityToId_fkey" FOREIGN KEY ("cityToId") REFERENCES "City"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
