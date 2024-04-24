/*
  Warnings:

  - Added the required column `neighborhood` to the `Address` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Address` ADD COLUMN `neighborhood` VARCHAR(191) NOT NULL;
