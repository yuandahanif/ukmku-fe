/*
  Warnings:

  - You are about to alter the column `month` on the `Financial_reports` table. The data in that column could be lost. The data in that column will be cast from `Enum("Financial_reports_month")` to `Enum("Financial_reports_month")`.

*/
-- AlterTable
ALTER TABLE `Financial_reports` MODIFY `month` ENUM('januari', 'februari', 'maret', 'april', 'mei', 'juni', 'juli', 'agustus', 'september', 'oktober', 'november', 'desember') NULL DEFAULT 'januari';
