/*
  Warnings:

  - You are about to drop the column `state` on the `patient` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `patient` DROP COLUMN `state`,
    ADD COLUMN `status` ENUM('WAITING', 'IN_PROCESS', 'COMPLETED') NOT NULL DEFAULT 'WAITING';
