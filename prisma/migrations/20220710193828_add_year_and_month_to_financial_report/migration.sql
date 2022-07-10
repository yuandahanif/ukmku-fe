-- DropIndex
DROP INDEX `EvaluationSurveiId` ON `Ideas`;

-- AlterTable
ALTER TABLE `Financial_reports` ADD COLUMN `month` ENUM('jan', 'feb', 'mar', 'apr', 'mei', 'jun', 'jul', 'ags', 'sep', 'okt', 'nov', 'des') NULL DEFAULT 'jan',
    ADD COLUMN `year` YEAR NULL;
