-- CreateTable
CREATE TABLE `Categories` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `clasification` ENUM('idea', 'evaluation') NULL DEFAULT 'idea',
    `createdAt` DATETIME(0) NOT NULL,
    `updatedAt` DATETIME(0) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Evaluation_surveis` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` INTEGER NOT NULL,
    `done_at` DATETIME(0) NOT NULL,
    `createdAt` DATETIME(0) NOT NULL,
    `updatedAt` DATETIME(0) NOT NULL,
    `EvaluationId` INTEGER NULL,

    INDEX `EvaluationId`(`EvaluationId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Evaluations` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` INTEGER NOT NULL,
    `umkm_name` VARCHAR(255) NOT NULL,
    `location` LONGTEXT NOT NULL,
    `description` LONGTEXT NOT NULL,
    `createdAt` DATETIME(0) NOT NULL,
    `updatedAt` DATETIME(0) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Files` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `url` MEDIUMTEXT NOT NULL,
    `createdAt` DATETIME(0) NOT NULL,
    `updatedAt` DATETIME(0) NOT NULL,
    `ideasId` INTEGER NULL,
    `evaluation_surveisId` INTEGER NULL,
    `evaluationsId` INTEGER NULL,
    `financial_reportsId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Financial_reports` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255) NOT NULL,
    `description` LONGTEXT NOT NULL,
    `profit` INTEGER NOT NULL,
    `fund` INTEGER NOT NULL,
    `createdAt` DATETIME(0) NOT NULL,
    `updatedAt` DATETIME(0) NOT NULL,
    `IdeaId` INTEGER NULL,

    INDEX `IdeaId`(`IdeaId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Fund_transactions` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `total` INTEGER NOT NULL,
    `createdAt` DATETIME(0) NOT NULL,
    `updatedAt` DATETIME(0) NOT NULL,
    `IdeaId` INTEGER NULL,

    INDEX `IdeaId`(`IdeaId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Ideas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `description` LONGTEXT NOT NULL,
    `required_fund` VARCHAR(255) NOT NULL,
    `location` MEDIUMTEXT NOT NULL,
    `status` ENUM('funded', 'canceled', 'panding') NOT NULL DEFAULT 'panding',
    `createdAt` DATETIME(0) NOT NULL,
    `updatedAt` DATETIME(0) NOT NULL,
    `UserId` INTEGER NULL,
    `CategoryId` INTEGER NULL,
    `EvaluationSurveiId` INTEGER NULL,

    INDEX `CategoryId`(`CategoryId`),
    INDEX `EvaluationSurveiId`(`EvaluationSurveiId`),
    INDEX `UserId`(`UserId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Reject_fund_reasons` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `description` LONGTEXT NULL,
    `createdAt` DATETIME(0) NOT NULL,
    `updatedAt` DATETIME(0) NOT NULL,
    `IdeaId` INTEGER NULL,

    INDEX `IdeaId`(`IdeaId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `username` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `role` ENUM('admin', 'umkm') NOT NULL,
    `createdAt` DATETIME(0) NOT NULL,
    `updatedAt` DATETIME(0) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Evaluation_surveis` ADD CONSTRAINT `Evaluation_surveis_ibfk_1` FOREIGN KEY (`EvaluationId`) REFERENCES `Evaluations`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Files` ADD CONSTRAINT `Files_evaluation_surveisId_fkey` FOREIGN KEY (`evaluation_surveisId`) REFERENCES `Evaluation_surveis`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Files` ADD CONSTRAINT `Files_evaluationsId_fkey` FOREIGN KEY (`evaluationsId`) REFERENCES `Evaluations`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Files` ADD CONSTRAINT `Files_financial_reportsId_fkey` FOREIGN KEY (`financial_reportsId`) REFERENCES `Financial_reports`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Files` ADD CONSTRAINT `Files_ideasId_fkey` FOREIGN KEY (`ideasId`) REFERENCES `Ideas`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Financial_reports` ADD CONSTRAINT `Financial_reports_ibfk_1` FOREIGN KEY (`IdeaId`) REFERENCES `Ideas`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Fund_transactions` ADD CONSTRAINT `Fund_transactions_ibfk_1` FOREIGN KEY (`IdeaId`) REFERENCES `Ideas`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Ideas` ADD CONSTRAINT `Ideas_ibfk_2` FOREIGN KEY (`CategoryId`) REFERENCES `Categories`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Ideas` ADD CONSTRAINT `Ideas_ibfk_3` FOREIGN KEY (`EvaluationSurveiId`) REFERENCES `Evaluation_surveis`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Ideas` ADD CONSTRAINT `Ideas_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `Users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reject_fund_reasons` ADD CONSTRAINT `Reject_fund_reasons_ibfk_1` FOREIGN KEY (`IdeaId`) REFERENCES `Ideas`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
