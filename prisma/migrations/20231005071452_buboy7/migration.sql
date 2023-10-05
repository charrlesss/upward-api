/*
  Warnings:

  - A unique constraint covering the columns `[Policy]` on the table `mortgagee` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `mortgagee` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `update` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `Policy` VARCHAR(100) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `mortgagee_Policy_key` ON `mortgagee`(`Policy`);
