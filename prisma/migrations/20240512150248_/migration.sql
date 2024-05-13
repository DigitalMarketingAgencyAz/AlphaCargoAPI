-- AlterTable
ALTER TABLE "City" ADD COLUMN     "calculatorId" INTEGER;

-- CreateTable
CREATE TABLE "Calculator" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "Calculator_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "City" ADD CONSTRAINT "City_calculatorId_fkey" FOREIGN KEY ("calculatorId") REFERENCES "Calculator"("id") ON DELETE SET NULL ON UPDATE CASCADE;
