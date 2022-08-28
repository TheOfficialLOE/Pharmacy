/*
  Warnings:

  - You are about to drop the `inventory` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `inventory` DROP FOREIGN KEY `Inventory_supplierId_fkey`;

-- DropTable
DROP TABLE `inventory`;

-- CreateTable
CREATE TABLE `Drug` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(30) NOT NULL,
    `drugFamily` VARCHAR(20) NOT NULL,
    `manufactureDate` DATETIME(3) NOT NULL,
    `expirationDate` DATETIME(3) NOT NULL,
    `suppliedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `requiresDoctorPrescription` BOOLEAN NOT NULL,
    `price` INTEGER NOT NULL,
    `remaining` INTEGER NOT NULL,
    `supplierId` VARCHAR(191) NOT NULL,
    `supplierOrganization` VARCHAR(30) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Drug` ADD CONSTRAINT `Drug_supplierId_fkey` FOREIGN KEY (`supplierId`) REFERENCES `Staff`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
