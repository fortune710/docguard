-- CreateTable
CREATE TABLE "Card" (
    "id" TEXT NOT NULL,
    "document_id" TEXT NOT NULL,
    "card_front" TEXT NOT NULL,
    "card_back" TEXT NOT NULL,

    CONSTRAINT "Card_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Card_document_id_key" ON "Card"("document_id");

-- CreateIndex
CREATE INDEX "Document_user_id_idx" ON "Document"("user_id");

-- AddForeignKey
ALTER TABLE "Card" ADD CONSTRAINT "Card_document_id_fkey" FOREIGN KEY ("document_id") REFERENCES "Document"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
