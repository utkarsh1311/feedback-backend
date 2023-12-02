/*
  Warnings:

  - You are about to drop the column `username` on the `Teacher` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Teacher_username_key";

-- AlterTable
ALTER TABLE "Teacher" DROP COLUMN "username";
