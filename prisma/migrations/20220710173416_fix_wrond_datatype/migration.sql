/*
  Warnings:

  - You are about to alter the column `required_fund` on the `Ideas` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `Int`.
  - A unique constraint covering the columns `[email]` on the table `Users` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `Ideas` DROP FOREIGN KEY `Ideas_ibfk_3`;

-- AlterTable
ALTER TABLE `Evaluation_surveis` ADD COLUMN `IdeaId` INTEGER NULL,
    MODIFY `name` LONGTEXT NOT NULL;

-- AlterTable
ALTER TABLE `Evaluations` MODIFY `name` LONGTEXT NOT NULL;

-- AlterTable
ALTER TABLE `Financial_reports` MODIFY `title` TEXT NOT NULL;

-- AlterTable
ALTER TABLE `Ideas` MODIFY `required_fund` INTEGER NOT NULL;

-- CreateIndex
CREATE INDEX `IdeaId` ON `Evaluation_surveis`(`IdeaId`);

-- CreateIndex
CREATE UNIQUE INDEX `Users_email_key` ON `Users`(`email`);

-- AddForeignKey
ALTER TABLE `Evaluation_surveis` ADD CONSTRAINT `Evaluation_surveis_ibfk_2` FOREIGN KEY (`IdeaId`) REFERENCES `Ideas`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
