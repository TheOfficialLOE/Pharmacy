/*
  Warnings:

  - Made the column `email` on table `patient` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `patient` MODIFY `email` VARCHAR(191) NOT NULL;
