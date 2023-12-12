/*
  Warnings:

  - Made the column `testScore` on table `Feedback` required. This step will fail if there are existing NULL values in that column.
  - Changed the type of `duration` on the `Feedback` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Feedback" ALTER COLUMN "testScore" SET NOT NULL,
DROP COLUMN "duration",
ADD COLUMN     "duration" INTEGER NOT NULL;
