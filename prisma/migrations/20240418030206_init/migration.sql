/*
  Warnings:

  - You are about to drop the column `card_back_key` on the `Card` table. All the data in the column will be lost.
  - You are about to drop the column `card_front_key` on the `Card` table. All the data in the column will be lost.
  - Added the required column `card_back` to the `Card` table without a default value. This is not possible if the table is not empty.
  - Added the required column `card_front` to the `Card` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Card" DROP COLUMN "card_back_key",
DROP COLUMN "card_front_key",
ADD COLUMN     "card_back" TEXT NOT NULL,
ADD COLUMN     "card_front" TEXT NOT NULL;
