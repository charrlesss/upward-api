/*
  Warnings:

  - You are about to alter the column `Cost` on the `ctplregistration` table. The data in that column could be lost. The data in that column will be cast from `VarChar(1501)` to `VarChar(150)`.

*/
-- AlterTable
ALTER TABLE `ctplregistration` ADD COLUMN `ctplType` VARCHAR(250) NULL,
    MODIFY `Cost` VARCHAR(150) NULL;
