/*
  Warnings:

  - You are about to drop the column `energy_shield` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `itemLevel` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `nameBuff` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `requires_level` on the `Item` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Item" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "supname" TEXT,
    "fee" TEXT,
    "itemClass" TEXT,
    "league" TEXT,
    "owner" TEXT,
    "description" TEXT,
    "shortDescription" TEXT,
    "categoryId" TEXT NOT NULL,
    "rarity" TEXT,
    "imageId" TEXT,
    "socket" TEXT,
    "str" TEXT,
    "quality" TEXT,
    "int" TEXT,
    "dex" TEXT,
    "energyShield" TEXT,
    "requiresLevel" TEXT,
    "physicalDamage" TEXT,
    "strikeChange" TEXT,
    "attackSeconds" TEXT,
    "intBuff" TEXT,
    "buff_1_html" TEXT,
    "buff_2_html" TEXT,
    "buff_3_html" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Item_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Item_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "Image" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Item" ("buff_1_html", "buff_2_html", "buff_3_html", "categoryId", "createdAt", "description", "fee", "id", "imageId", "int", "itemClass", "league", "name", "owner", "quality", "rarity", "shortDescription", "socket", "supname", "updatedAt") SELECT "buff_1_html", "buff_2_html", "buff_3_html", "categoryId", "createdAt", "description", "fee", "id", "imageId", "int", "itemClass", "league", "name", "owner", "quality", "rarity", "shortDescription", "socket", "supname", "updatedAt" FROM "Item";
DROP TABLE "Item";
ALTER TABLE "new_Item" RENAME TO "Item";
CREATE UNIQUE INDEX "Item_imageId_key" ON "Item"("imageId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
