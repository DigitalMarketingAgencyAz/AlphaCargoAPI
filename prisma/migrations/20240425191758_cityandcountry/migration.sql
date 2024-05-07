-- CreateTable
CREATE TABLE "City" (
    "id" SERIAL NOT NULL,
    "cityname" TEXT NOT NULL,

    CONSTRAINT "City_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Country" (
    "id" SERIAL NOT NULL,
    "countryname" TEXT NOT NULL,

    CONSTRAINT "Country_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "City_cityname_key" ON "City"("cityname");

-- CreateIndex
CREATE UNIQUE INDEX "Country_countryname_key" ON "Country"("countryname");
