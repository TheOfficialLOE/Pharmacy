/*
  Warnings:

  - You are about to alter the column `state` on the `patient` table. The data in that column could be lost. The data in that column will be cast from `Enum("patient_state")` to `Enum("Patient_state")`.

*/
-- AlterTable
ALTER TABLE `patient` MODIFY `state` ENUM('WAITING', 'COMPLETED') NOT NULL DEFAULT 'WAITING';
