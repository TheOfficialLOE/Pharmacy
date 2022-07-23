/*
  Warnings:

  - You are about to drop the column `orderComplete` on the `patient` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `patient` DROP COLUMN `orderComplete`,
    ADD COLUMN `isOrderCompleted` BOOLEAN NOT NULL DEFAULT false;
