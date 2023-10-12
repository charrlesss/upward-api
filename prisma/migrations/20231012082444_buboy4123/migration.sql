/*
  Warnings:

  - You are about to alter the column `Date_Entry` on the `journal` table. The data in that column could be lost. The data in that column will be cast from `DateTime(6)` to `DateTime(3)`.
  - You are about to alter the column `Check_Date` on the `journal` table. The data in that column could be lost. The data in that column will be cast from `DateTime(6)` to `DateTime(3)`.
  - You are about to alter the column `Check_Return` on the `journal` table. The data in that column could be lost. The data in that column will be cast from `DateTime(6)` to `DateTime(3)`.
  - You are about to alter the column `Check_Collect` on the `journal` table. The data in that column could be lost. The data in that column will be cast from `DateTime(6)` to `DateTime(3)`.
  - You are about to alter the column `Check_Deposit` on the `journal` table. The data in that column could be lost. The data in that column will be cast from `DateTime(6)` to `DateTime(3)`.

*/
-- AlterTable
ALTER TABLE `journal` MODIFY `Date_Entry` DATETIME(3) NULL,
    MODIFY `Check_Date` DATETIME(3) NULL,
    MODIFY `Check_Return` DATETIME(3) NULL,
    MODIFY `Check_Collect` DATETIME(3) NULL,
    MODIFY `Check_Deposit` DATETIME(3) NULL;
