/*
  Warnings:

  - The primary key for the `policy_account` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `Account_Id` on the `policy_account` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[Account]` on the table `policy_account` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `policy_account` DROP PRIMARY KEY,
    DROP COLUMN `Account_Id`;

-- CreateIndex
CREATE UNIQUE INDEX `policy_account_Account_key` ON `policy_account`(`Account`);
