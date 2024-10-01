/*
  Warnings:

  - You are about to drop the column `userId` on the `artists` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "artists" DROP CONSTRAINT "artists_userId_fkey";

-- AlterTable
ALTER TABLE "artists" DROP COLUMN "userId",
ADD COLUMN     "user_id" TEXT;

-- AddForeignKey
ALTER TABLE "artists" ADD CONSTRAINT "artists_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
