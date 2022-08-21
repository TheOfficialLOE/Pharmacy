/*
  Warnings:

  - You are about to drop the column `createdAt` on the `inventory` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `staff` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `inventory` DROP COLUMN `createdAt`,
    ADD COLUMN `suppliedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `staff` DROP COLUMN `createdAt`,
    ADD COLUMN `joinedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);
