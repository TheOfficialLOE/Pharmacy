/*
  Warnings:

  - You are about to drop the column `supplierEmail` on the `drug` table. All the data in the column will be lost.
  - Added the required column `supplierId` to the `Drug` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `drug` DROP FOREIGN KEY `Drug_supplierEmail_fkey`;

-- AlterTable
ALTER TABLE `drug` DROP COLUMN `supplierEmail`,
    ADD COLUMN `supplierId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Drug` ADD CONSTRAINT `Drug_supplierId_fkey` FOREIGN KEY (`supplierId`) REFERENCES `Staff`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
