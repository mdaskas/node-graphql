/*
  Warnings:

  - The primary key for the `BillingTerms` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `BillingTerms` table. All the data in the column will be lost.
  - The primary key for the `ShippingTerms` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `ShippingTerms` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Customer" DROP CONSTRAINT "Customer_billingTermsId_fkey";

-- DropForeignKey
ALTER TABLE "Customer" DROP CONSTRAINT "Customer_shippingTermsId_fkey";

-- DropIndex
DROP INDEX "BillingTerms_code_key";

-- DropIndex
DROP INDEX "ShippingTerms_code_key";

-- AlterTable
ALTER TABLE "BillingTerms" DROP CONSTRAINT "BillingTerms_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "BillingTerms_pkey" PRIMARY KEY ("code");

-- AlterTable
ALTER TABLE "Customer" ALTER COLUMN "billingTermsId" SET DATA TYPE TEXT,
ALTER COLUMN "shippingTermsId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "ShippingTerms" DROP CONSTRAINT "ShippingTerms_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "ShippingTerms_pkey" PRIMARY KEY ("code");

-- AddForeignKey
ALTER TABLE "Customer" ADD CONSTRAINT "Customer_billingTermsId_fkey" FOREIGN KEY ("billingTermsId") REFERENCES "BillingTerms"("code") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Customer" ADD CONSTRAINT "Customer_shippingTermsId_fkey" FOREIGN KEY ("shippingTermsId") REFERENCES "ShippingTerms"("code") ON DELETE SET NULL ON UPDATE CASCADE;
