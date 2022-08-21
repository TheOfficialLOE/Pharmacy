/*
  Warnings:

  - You are about to drop the `accountant` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `drug` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `pharmacist` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[assistantId]` on the table `Patient` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `drug` DROP FOREIGN KEY `Drug_supplierId_fkey`;

-- DropForeignKey
ALTER TABLE `pharmacist` DROP FOREIGN KEY `Pharmacist_currentPatientCode_fkey`;

-- AlterTable
ALTER TABLE `patient` ADD COLUMN `assistantId` VARCHAR(191) NULL;

-- DropTable
DROP TABLE `accountant`;

-- DropTable
DROP TABLE `drug`;

-- DropTable
DROP TABLE `pharmacist`;

-- CreateTable
CREATE TABLE `Staff` (
    `id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(30) NOT NULL,
    `name` VARCHAR(30) NOT NULL,
    `password` VARCHAR(200) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,
    `role` ENUM('PHARMACIST', 'ASSISTANT', 'ACCOUNTANT') NOT NULL,

    UNIQUE INDEX `Staff_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Inventory` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(30) NOT NULL,
    `drugFamily` VARCHAR(20) NOT NULL,
    `manufactureDate` DATETIME(3) NOT NULL,
    `expirationDate` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,
    `requiresDoctorPrescription` BOOLEAN NOT NULL,
    `price` INTEGER NOT NULL,
    `remaining` INTEGER NOT NULL,
    `supplierId` VARCHAR(191) NOT NULL,
    `supplierOrganization` VARCHAR(30) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Patient_assistantId_key` ON `Patient`(`assistantId`);

-- AddForeignKey
ALTER TABLE `Inventory` ADD CONSTRAINT `Inventory_supplierId_fkey` FOREIGN KEY (`supplierId`) REFERENCES `Staff`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Patient` ADD CONSTRAINT `Patient_assistantId_fkey` FOREIGN KEY (`assistantId`) REFERENCES `Staff`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
