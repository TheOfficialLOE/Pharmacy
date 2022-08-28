/*
  Warnings:

  - You are about to drop the column `supplierId` on the `drug` table. All the data in the column will be lost.
  - Added the required column `supplierEmail` to the `Drug` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `drug` DROP FOREIGN KEY `Drug_supplierId_fkey`;

-- AlterTable
ALTER TABLE `drug` DROP COLUMN `supplierId`,
    ADD COLUMN `supplierEmail` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Drug` ADD CONSTRAINT `Drug_supplierEmail_fkey` FOREIGN KEY (`supplierEmail`) REFERENCES `Staff`(`email`) ON DELETE RESTRICT ON UPDATE CASCADE;
