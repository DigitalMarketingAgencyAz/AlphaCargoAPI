-- CreateTable
CREATE TABLE "TGUsers" (
    "id" SERIAL NOT NULL,
    "chat_id" INTEGER NOT NULL,
    "phone" TEXT NOT NULL,
    "userId" INTEGER,

    CONSTRAINT "TGUsers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TGUsers_chat_id_key" ON "TGUsers"("chat_id");

-- CreateIndex
CREATE UNIQUE INDEX "TGUsers_phone_key" ON "TGUsers"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "TGUsers_userId_key" ON "TGUsers"("userId");

-- AddForeignKey
ALTER TABLE "TGUsers" ADD CONSTRAINT "TGUsers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
