/*
  Warnings:

  - Made the column `Line` on table `subline` required. This step will fail if there are existing NULL values in that column.
  - Made the column `SublineName` on table `subline` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `subline` MODIFY `Line` TEXT NOT NULL,
    MODIFY `SublineName` VARCHAR(255) NOT NULL;

-- CreateTable
CREATE TABLE `subline_line` (
    `LineId` VARCHAR(191) NOT NULL,
    `Line` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`LineId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
