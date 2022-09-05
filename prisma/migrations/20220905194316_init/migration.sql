-- AlterTable
ALTER TABLE `patient` ADD COLUMN `pharmacistId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Patient` ADD CONSTRAINT `Patient_pharmacistId_fkey` FOREIGN KEY (`pharmacistId`) REFERENCES `Staff`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
