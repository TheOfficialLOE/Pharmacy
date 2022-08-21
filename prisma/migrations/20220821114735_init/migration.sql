/*
  Warnings:

  - You are about to drop the column `updatedAt` on the `inventory` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `patient` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `staff` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `inventory` DROP COLUMN `updatedAt`;

-- AlterTable
ALTER TABLE `patient` DROP COLUMN `updatedAt`;

-- AlterTable
ALTER TABLE `staff` DROP COLUMN `updatedAt`;
