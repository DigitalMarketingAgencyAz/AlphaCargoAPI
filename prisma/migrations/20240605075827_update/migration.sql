/*
  Warnings:

  - You are about to drop the column `lat` on the `Country` table. All the data in the column will be lost.
  - You are about to drop the column `lng` on the `Country` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Country" DROP COLUMN "lat",
DROP COLUMN "lng";

-- AlterTable
ALTER TABLE "Office" ADD COLUMN     "lat" TEXT,
ADD COLUMN     "lng" TEXT;
