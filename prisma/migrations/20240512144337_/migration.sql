/*
  Warnings:

  - Added the required column `price` to the `Bag` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Bag" ADD COLUMN     "price" INTEGER NOT NULL;
