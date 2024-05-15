/*
  Warnings:

  - Added the required column `price` to the `Calculator` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Calculator" ADD COLUMN     "price" INTEGER NOT NULL;
