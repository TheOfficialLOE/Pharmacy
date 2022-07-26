-- DropForeignKey
ALTER TABLE `pharmacist` DROP FOREIGN KEY `Pharmacist_currentPatientCode_fkey`;

-- AlterTable
ALTER TABLE `pharmacist` ALTER COLUMN `dateUpdated` DROP DEFAULT,
    MODIFY `todaySales` JSON NULL,
    MODIFY `currentPatientCode` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Pharmacist` ADD CONSTRAINT `Pharmacist_currentPatientCode_fkey` FOREIGN KEY (`currentPatientCode`) REFERENCES `Patient`(`code`) ON DELETE SET NULL ON UPDATE CASCADE;
