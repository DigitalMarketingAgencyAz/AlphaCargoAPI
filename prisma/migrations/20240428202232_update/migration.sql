-- CreateTable
CREATE TABLE "Office" (
    "id" SERIAL NOT NULL,
    "address" TEXT NOT NULL,
    "contactNumbers" TEXT[],
    "cityId" INTEGER NOT NULL,
    "countryId" INTEGER NOT NULL,
    "openingHour" INTEGER NOT NULL,
    "closingHour" INTEGER NOT NULL,

    CONSTRAINT "Office_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Office" ADD CONSTRAINT "Office_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "City"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Office" ADD CONSTRAINT "Office_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
