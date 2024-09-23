/*
  Warnings:

  - You are about to drop the column `userId` on the `tattos` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "tattos" DROP CONSTRAINT "tattos_userId_fkey";

-- AlterTable
ALTER TABLE "tattos" DROP COLUMN "userId",
ADD COLUMN     "user_id" TEXT;

-- AddForeignKey
ALTER TABLE "tattos" ADD CONSTRAINT "tattos_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
