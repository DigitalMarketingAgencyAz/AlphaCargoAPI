-- CreateTable
CREATE TABLE "Request" (
    "id" SERIAL NOT NULL,
    "fullName" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "pickupAddress" TEXT NOT NULL,
    "pickupTime" TIMESTAMP(3) NOT NULL,
    "packageSize" TEXT NOT NULL,
    "packageCount" INTEGER NOT NULL,
    "deliveryAddress" TEXT NOT NULL,

    CONSTRAINT "Request_pkey" PRIMARY KEY ("id")
);
