/*
  Warnings:

  - You are about to drop the column `remaining` on the `drug` table. All the data in the column will be lost.
  - Added the required column `quantity` to the `Drug` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `drug` DROP COLUMN `remaining`,
    ADD COLUMN `quantity` INTEGER NOT NULL;
