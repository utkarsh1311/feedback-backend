/*
  Warnings:

  - Added the required column `month` to the `Feedback` table without a default value. This is not possible if the table is not empty.
  - Added the required column `teacherName` to the `Feedback` table without a default value. This is not possible if the table is not empty.
  - Added the required column `weekday` to the `Feedback` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Feedback" ADD COLUMN     "month" TEXT NOT NULL,
ADD COLUMN     "teacherName" TEXT NOT NULL,
ADD COLUMN     "weekday" TEXT NOT NULL;
