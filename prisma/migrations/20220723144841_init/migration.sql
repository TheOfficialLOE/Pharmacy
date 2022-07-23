/*
  Warnings:

  - You are about to drop the column `drugs` on the `patient` table. All the data in the column will be lost.
  - Added the required column `demandedDrugs` to the `Patient` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `patient` DROP COLUMN `drugs`,
    ADD COLUMN `demandedDrugs` JSON NOT NULL;
