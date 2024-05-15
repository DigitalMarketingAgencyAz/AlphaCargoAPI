-- CreateEnum
CREATE TYPE "City_Type" AS ENUM ('From', 'To', 'Both');

-- AlterTable
ALTER TABLE "City" ADD COLUMN     "type" "City_Type" NOT NULL DEFAULT 'Both';
