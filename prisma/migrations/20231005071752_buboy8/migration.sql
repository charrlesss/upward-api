/*
  Warnings:

  - A unique constraint covering the columns `[Mortgagee]` on the table `mortgagee` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `mortgagee_Policy_key` ON `mortgagee`;

-- CreateIndex
CREATE UNIQUE INDEX `mortgagee_Mortgagee_key` ON `mortgagee`(`Mortgagee`);
