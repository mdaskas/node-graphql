/*
  Warnings:

  - You are about to drop the column `billingTermsId` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `shippingTermsId` on the `Customer` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Customer" DROP CONSTRAINT "Customer_billingTermsId_fkey";

-- DropForeignKey
ALTER TABLE "Customer" DROP CONSTRAINT "Customer_shippingTermsId_fkey";

-- AlterTable
ALTER TABLE "Customer" DROP COLUMN "billingTermsId",
DROP COLUMN "shippingTermsId",
ADD COLUMN     "billingTermsCode" TEXT,
ADD COLUMN     "shippingTermsCode" TEXT;

-- AddForeignKey
ALTER TABLE "Customer" ADD CONSTRAINT "Customer_billingTermsCode_fkey" FOREIGN KEY ("billingTermsCode") REFERENCES "BillingTerms"("code") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Customer" ADD CONSTRAINT "Customer_shippingTermsCode_fkey" FOREIGN KEY ("shippingTermsCode") REFERENCES "ShippingTerms"("code") ON DELETE SET NULL ON UPDATE CASCADE;
