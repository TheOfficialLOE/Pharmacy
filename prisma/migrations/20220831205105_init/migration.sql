/*
  Warnings:

  - You are about to drop the column `isOrderCompleted` on the `patient` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `patient` DROP COLUMN `isOrderCompleted`,
    ADD COLUMN `state` ENUM('WAITING', 'COMPLETED') NOT NULL DEFAULT 'WAITING';
