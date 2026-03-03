/*
  Warnings:

  - You are about to drop the column `billingTermsCode` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `shippingTermsCode` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the `BillingTerms` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ShippingTerms` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Customer" DROP CONSTRAINT "Customer_billingTermsCode_fkey";

-- DropForeignKey
ALTER TABLE "Customer" DROP CONSTRAINT "Customer_shippingTermsCode_fkey";

-- AlterTable
ALTER TABLE "Customer" DROP COLUMN "billingTermsCode",
DROP COLUMN "shippingTermsCode",
ADD COLUMN     "billingTermId" INTEGER,
ADD COLUMN     "shippingTermId" INTEGER;

-- DropTable
DROP TABLE "BillingTerms";

-- DropTable
DROP TABLE "ShippingTerms";

-- CreateTable
CREATE TABLE "BillingTerm" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "dueDays" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BillingTerm_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ShippingTerm" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ShippingTerm_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BillingTerm_code_key" ON "BillingTerm"("code");

-- CreateIndex
CREATE UNIQUE INDEX "ShippingTerm_code_key" ON "ShippingTerm"("code");

-- AddForeignKey
ALTER TABLE "Customer" ADD CONSTRAINT "Customer_billingTermId_fkey" FOREIGN KEY ("billingTermId") REFERENCES "BillingTerm"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Customer" ADD CONSTRAINT "Customer_shippingTermId_fkey" FOREIGN KEY ("shippingTermId") REFERENCES "ShippingTerm"("id") ON DELETE SET NULL ON UPDATE CASCADE;
