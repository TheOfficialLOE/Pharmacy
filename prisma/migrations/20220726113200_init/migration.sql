/*
  Warnings:

  - You are about to drop the column `visitDate` on the `patient` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `patient` DROP COLUMN `visitDate`,
    ADD COLUMN `dateVisited` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);
