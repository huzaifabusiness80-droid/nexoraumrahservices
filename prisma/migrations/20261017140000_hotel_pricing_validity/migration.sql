ALTER TABLE "Hotel"
ADD COLUMN "isContactPricing" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN "priceValidFrom" TEXT,
ADD COLUMN "priceValidUntil" TEXT;
