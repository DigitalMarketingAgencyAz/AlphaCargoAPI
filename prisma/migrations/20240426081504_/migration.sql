-- CreateTable
CREATE TABLE "Bag" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "Bag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Service" (
    "id" SERIAL NOT NULL,
    "header_title" TEXT NOT NULL,
    "header_body" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "imagePath" TEXT,

    CONSTRAINT "Service_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Bag_title_key" ON "Bag"("title");
