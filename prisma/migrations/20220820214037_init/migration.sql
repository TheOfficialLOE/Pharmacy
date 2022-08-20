/*
  Warnings:

  - You are about to drop the column `joinedAt` on the `accountant` table. All the data in the column will be lost.
  - You are about to drop the column `joinedAt` on the `pharmacist` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `accountant` DROP COLUMN `joinedAt`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `pharmacist` DROP COLUMN `joinedAt`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);
