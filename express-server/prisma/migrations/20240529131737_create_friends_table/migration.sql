-- CreateTable
CREATE TABLE "friends" (
    "requester_id" UUID NOT NULL,
    "receiver_id" UUID NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "friends_requester_id_receiver_id_key" ON "friends"("requester_id", "receiver_id");

-- AddForeignKey
ALTER TABLE "friends" ADD CONSTRAINT "friends_requester_id_fkey" FOREIGN KEY ("requester_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "friends" ADD CONSTRAINT "friends_receiver_id_fkey" FOREIGN KEY ("receiver_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
