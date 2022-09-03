/*
  Warnings:

  - You are about to drop the column `demandedDrugs` on the `patient` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `patient` DROP COLUMN `demandedDrugs`;

-- CreateTable
CREATE TABLE `Cart` (
    `id` VARCHAR(191) NOT NULL,
    `patientId` VARCHAR(191) NOT NULL,
    `drugId` VARCHAR(191) NOT NULL,
    `quantity` INTEGER NOT NULL,
    `isDone` BOOLEAN NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Cart` ADD CONSTRAINT `Cart_patientId_fkey` FOREIGN KEY (`patientId`) REFERENCES `Patient`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Cart` ADD CONSTRAINT `Cart_drugId_fkey` FOREIGN KEY (`drugId`) REFERENCES `Drug`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
