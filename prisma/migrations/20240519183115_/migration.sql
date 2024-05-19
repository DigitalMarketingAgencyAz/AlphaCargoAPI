/*
  Warnings:

  - You are about to drop the `Parcel` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Parcel" DROP CONSTRAINT "Parcel_userId_fkey";

-- DropTable
DROP TABLE "Parcel";
