-- CreateEnum
CREATE TYPE "Category" AS ENUM ('personal', 'finance', 'health');

-- AlterTable
ALTER TABLE "Document" ADD COLUMN     "category" "Category" NOT NULL DEFAULT 'personal';
