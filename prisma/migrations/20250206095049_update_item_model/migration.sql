/*
  Warnings:

  - You are about to drop the column `additionalStatistics` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `implicitEffects` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `requirements` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `supname_modal` on the `Item` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Item" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "supname" TEXT,
    "itemClass" TEXT,
    "league" TEXT,
    "owner" TEXT,
    "description" TEXT,
    "shortDescription" TEXT,
    "categoryId" TEXT NOT NULL,
    "fee" INTEGER,
    "rarity" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "itemLevel" INTEGER,
    "imageId" TEXT,
    CONSTRAINT "Item_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Item_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "Image" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Item" ("categoryId", "createdAt", "description", "fee", "id", "imageId", "itemClass", "itemLevel", "league", "name", "owner", "rarity", "shortDescription", "supname", "updatedAt") SELECT "categoryId", "createdAt", "description", "fee", "id", "imageId", "itemClass", "itemLevel", "league", "name", "owner", "rarity", "shortDescription", "supname", "updatedAt" FROM "Item";
DROP TABLE "Item";
ALTER TABLE "new_Item" RENAME TO "Item";
CREATE UNIQUE INDEX "Item_imageId_key" ON "Item"("imageId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
