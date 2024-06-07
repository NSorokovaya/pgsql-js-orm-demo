-- DropForeignKey
ALTER TABLE "users_emails" DROP CONSTRAINT "users_emails_user_id_fkey";

-- AddForeignKey
ALTER TABLE "users_emails" ADD CONSTRAINT "users_emails_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
