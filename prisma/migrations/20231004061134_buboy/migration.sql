/*
  Warnings:

  - You are about to drop the `account` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `account`;

-- CreateTable
CREATE TABLE `policy_account` (
    `Account_Id` VARCHAR(10) NOT NULL,
    `Account` VARCHAR(20) NOT NULL,
    `Description` VARCHAR(100) NOT NULL,
    `AccountCode` VARCHAR(5) NOT NULL,
    `COM` BOOLEAN NOT NULL,
    `TPL` BOOLEAN NOT NULL,
    `MAR` BOOLEAN NOT NULL,
    `FIRE` BOOLEAN NOT NULL,
    `G02` BOOLEAN NOT NULL,
    `G13` BOOLEAN NOT NULL,
    `G16` BOOLEAN NOT NULL,
    `MSPR` BOOLEAN NOT NULL,
    `PA` BOOLEAN NOT NULL,
    `CGL` BOOLEAN NOT NULL,
    `Inactive` BOOLEAN NOT NULL,

    PRIMARY KEY (`Account_Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
