/*
  Warnings:

  - You are about to drop the column `assistantId` on the `patient` table. All the data in the column will be lost.
  - The values [ASSISTANT] on the enum `Staff_role` will be removed. If these variants are still used in the database, this will fail.
  - A unique constraint covering the columns `[pharmacistId]` on the table `Patient` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `patient` DROP FOREIGN KEY `Patient_assistantId_fkey`;

-- AlterTable
ALTER TABLE `patient` DROP COLUMN `assistantId`,
    ADD COLUMN `pharmacistId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `staff` MODIFY `role` ENUM('PHARMACIST', 'ACCOUNTANT') NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Patient_pharmacistId_key` ON `Patient`(`pharmacistId`);

-- AddForeignKey
ALTER TABLE `Patient` ADD CONSTRAINT `Patient_pharmacistId_fkey` FOREIGN KEY (`pharmacistId`) REFERENCES `Staff`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
