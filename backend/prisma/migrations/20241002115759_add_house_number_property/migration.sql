/*
  Warnings:

  - Added the required column `houseNumber` to the `artists` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "artists" ADD COLUMN     "houseNumber" TEXT NOT NULL;
