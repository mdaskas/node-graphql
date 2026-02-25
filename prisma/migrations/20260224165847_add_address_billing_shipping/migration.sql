/*
  Warnings:

  - A unique constraint covering the columns `[billToAddressId]` on the table `Customer` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Customer" ADD COLUMN     "billToAddressId" INTEGER,
ADD COLUMN     "billingTermsId" INTEGER,
ADD COLUMN     "shippingTermsId" INTEGER;

-- CreateTable
CREATE TABLE "Address" (
    "id" SERIAL NOT NULL,
    "street1" TEXT NOT NULL,
    "street2" TEXT,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "zip" TEXT NOT NULL,
    "country" TEXT NOT NULL DEFAULT 'US',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "shipToCustomerId" INTEGER,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BillingTerms" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "dueDays" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BillingTerms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ShippingTerms" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ShippingTerms_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BillingTerms_code_key" ON "BillingTerms"("code");

-- CreateIndex
CREATE UNIQUE INDEX "ShippingTerms_code_key" ON "ShippingTerms"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Customer_billToAddressId_key" ON "Customer"("billToAddressId");

-- AddForeignKey
ALTER TABLE "Customer" ADD CONSTRAINT "Customer_billingTermsId_fkey" FOREIGN KEY ("billingTermsId") REFERENCES "BillingTerms"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Customer" ADD CONSTRAINT "Customer_shippingTermsId_fkey" FOREIGN KEY ("shippingTermsId") REFERENCES "ShippingTerms"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Customer" ADD CONSTRAINT "Customer_billToAddressId_fkey" FOREIGN KEY ("billToAddressId") REFERENCES "Address"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_shipToCustomerId_fkey" FOREIGN KEY ("shipToCustomerId") REFERENCES "Customer"("id") ON DELETE SET NULL ON UPDATE CASCADE;
