-- CreateTable
CREATE TABLE "Franchise" (
    "id" SERIAL NOT NULL,
    "region" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "fio" TEXT NOT NULL,
    "birthDate" TIMESTAMP(3) NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "sourceInfo" TEXT,

    CONSTRAINT "Franchise_pkey" PRIMARY KEY ("id")
);
