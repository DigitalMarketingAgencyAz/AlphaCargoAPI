-- CreateTable
CREATE TABLE "Tariff" (
    "id" SERIAL NOT NULL,
    "countryId" INTEGER NOT NULL,
    "typeId" INTEGER NOT NULL,
    "cityToId" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "deliveryTime" TEXT NOT NULL,

    CONSTRAINT "Tariff_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Tariff" ADD CONSTRAINT "Tariff_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tariff" ADD CONSTRAINT "Tariff_cityToId_fkey" FOREIGN KEY ("cityToId") REFERENCES "City"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tariff" ADD CONSTRAINT "Tariff_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "ParcelType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
