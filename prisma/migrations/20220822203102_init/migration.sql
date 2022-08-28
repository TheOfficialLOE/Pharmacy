/*
  Warnings:

  - You are about to drop the column `name` on the `drug` table. All the data in the column will be lost.
  - Added the required column `drugName` to the `Drug` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `drug` DROP COLUMN `name`,
    ADD COLUMN `drugName` VARCHAR(30) NOT NULL;
