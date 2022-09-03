/*
  Warnings:

  - You are about to drop the column `hasValidDoctorPrescription` on the `patient` table. All the data in the column will be lost.
  - You are about to drop the column `pharmacistId` on the `patient` table. All the data in the column will be lost.
  - You are about to alter the column `email` on the `patient` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(30)`.
  - You are about to drop the `cart` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `cart` DROP FOREIGN KEY `Cart_drugId_fkey`;

-- DropForeignKey
ALTER TABLE `cart` DROP FOREIGN KEY `Cart_patientId_fkey`;

-- DropForeignKey
ALTER TABLE `patient` DROP FOREIGN KEY `Patient_pharmacistId_fkey`;

-- DropIndex
DROP INDEX `Patient_email_key` ON `patient`;

-- AlterTable
ALTER TABLE `patient` DROP COLUMN `hasValidDoctorPrescription`,
    DROP COLUMN `pharmacistId`,
    MODIFY `name` VARCHAR(30) NULL,
    MODIFY `email` VARCHAR(30) NULL,
    MODIFY `code` VARCHAR(191) NULL,
    ALTER COLUMN `state` DROP DEFAULT;

-- DropTable
DROP TABLE `cart`;
