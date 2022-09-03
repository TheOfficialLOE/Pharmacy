/*
  Warnings:

  - Made the column `code` on table `patient` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `patient` MODIFY `code` VARCHAR(191) NOT NULL;
