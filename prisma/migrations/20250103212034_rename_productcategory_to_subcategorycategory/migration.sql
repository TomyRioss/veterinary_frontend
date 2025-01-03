/*
  Warnings:

  - You are about to drop the `ProductCategory` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ProductCategory" DROP CONSTRAINT "ProductCategory_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "ProductCategory" DROP CONSTRAINT "ProductCategory_productId_fkey";

-- DropTable
DROP TABLE "ProductCategory";

-- CreateTable
CREATE TABLE "SubcategoryCategory" (
    "id" SERIAL NOT NULL,
    "subcategoryId" INTEGER NOT NULL,
    "categoryId" TEXT NOT NULL,

    CONSTRAINT "SubcategoryCategory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SubcategoryCategory_subcategoryId_categoryId_key" ON "SubcategoryCategory"("subcategoryId", "categoryId");

-- AddForeignKey
ALTER TABLE "SubcategoryCategory" ADD CONSTRAINT "SubcategoryCategory_subcategoryId_fkey" FOREIGN KEY ("subcategoryId") REFERENCES "Subcategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubcategoryCategory" ADD CONSTRAINT "SubcategoryCategory_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
