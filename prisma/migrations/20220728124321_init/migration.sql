/*
  Warnings:

  - You are about to drop the column `dateJoined` on the `accountant` table. All the data in the column will be lost.
  - You are about to drop the column `dateUpdated` on the `accountant` table. All the data in the column will be lost.
  - You are about to drop the column `dateVisited` on the `patient` table. All the data in the column will be lost.
  - You are about to drop the column `dateJoined` on the `pharmacist` table. All the data in the column will be lost.
  - You are about to drop the column `dateUpdated` on the `pharmacist` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `accountant` DROP COLUMN `dateJoined`,
    DROP COLUMN `dateUpdated`,
    ADD COLUMN `joinedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `drug` ADD COLUMN `suppliedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `patient` DROP COLUMN `dateVisited`,
    ADD COLUMN `updatedAt` DATETIME(3) NULL,
    ADD COLUMN `visitedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `pharmacist` DROP COLUMN `dateJoined`,
    DROP COLUMN `dateUpdated`,
    ADD COLUMN `joinedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NULL;
