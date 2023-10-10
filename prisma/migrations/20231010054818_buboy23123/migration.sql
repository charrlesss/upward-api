/*
  Warnings:

  - Made the column `PolicyNo` on table `vpolicy` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `vpolicy` MODIFY `PolicyNo` VARCHAR(20) NOT NULL,
    ADD PRIMARY KEY (`PolicyNo`);
