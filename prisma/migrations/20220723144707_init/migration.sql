/*
  Warnings:

  - You are about to drop the column `validDoctorPrescription` on the `patient` table. All the data in the column will be lost.
  - Added the required column `hasValidDoctorPrescription` to the `Patient` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `patient` DROP COLUMN `validDoctorPrescription`,
    ADD COLUMN `hasValidDoctorPrescription` BOOLEAN NOT NULL;
