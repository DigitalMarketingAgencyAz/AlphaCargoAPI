-- CreateTable
CREATE TABLE "ParcelType" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "ParcelType_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ParcelType_name_key" ON "ParcelType"("name");
