-- CreateTable
CREATE TABLE "users_emails" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "user_id" UUID NOT NULL,
    "email" VARCHAR(255) NOT NULL,

    CONSTRAINT "users_emails_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "users_emails" ADD CONSTRAINT "users_emails_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
