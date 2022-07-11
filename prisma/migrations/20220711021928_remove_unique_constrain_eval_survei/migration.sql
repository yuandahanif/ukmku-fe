-- DropIndex
DROP INDEX "Evaluation_surveis_IdeaId_key";

-- RenameIndex
ALTER INDEX "IdeaId_" RENAME TO "IdeaId_to_survei";
