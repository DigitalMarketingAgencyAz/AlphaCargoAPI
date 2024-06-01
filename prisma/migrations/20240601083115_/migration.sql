-- CreateTable
CREATE TABLE "Contract" (
    "id" SERIAL NOT NULL,
    "organizationalStructure" TEXT NOT NULL,
    "organizationName" TEXT NOT NULL,
    "inn" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "contactPhone" TEXT NOT NULL,

    CONSTRAINT "Contract_pkey" PRIMARY KEY ("id")
);
