-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateEnum
CREATE TYPE "ServiceType" AS ENUM ('UMRAH_TRANSPORT', 'UMRAH_HOTEL', 'UMRAH_ZIYARAT', 'UAE_CITY_TOUR', 'DESERT_SAFARI', 'CAR_RENTAL');

-- CreateEnum
CREATE TYPE "BookingStatus" AS ENUM ('PENDING', 'CONFIRMED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('UNPAID', 'PARTIAL', 'PAID', 'REFUNDED');

-- CreateTable
CREATE TABLE "AdminUser" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'ADMIN',
    "avatar" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AdminUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Booking" (
    "id" TEXT NOT NULL,
    "bookingNumber" TEXT NOT NULL,
    "serviceType" "ServiceType" NOT NULL,
    "customerName" TEXT NOT NULL,
    "customerPhone" TEXT NOT NULL,
    "customerEmail" TEXT,
    "customerCountry" TEXT,
    "pickupLocation" TEXT,
    "dropoffLocation" TEXT,
    "pickupDate" TIMESTAMP(3),
    "returnDate" TIMESTAMP(3),
    "passengers" INTEGER NOT NULL DEFAULT 1,
    "luggageCount" INTEGER,
    "itemName" TEXT,
    "itemCategory" TEXT,
    "route" TEXT,
    "totalPrice" DOUBLE PRECISION,
    "currency" TEXT NOT NULL DEFAULT 'SAR',
    "status" "BookingStatus" NOT NULL DEFAULT 'PENDING',
    "paymentStatus" "PaymentStatus" NOT NULL DEFAULT 'UNPAID',
    "adminNotes" TEXT,
    "customerNotes" TEXT,
    "assignedDriver" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Booking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TransportVehicle" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "seats" TEXT NOT NULL,
    "luggage" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "gallery" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "posterImage" TEXT,
    "startingPriceSar" DOUBLE PRECISION NOT NULL,
    "description" TEXT NOT NULL,
    "features" TEXT[],
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TransportVehicle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TransportRouteRate" (
    "id" TEXT NOT NULL,
    "route" TEXT NOT NULL,
    "fromCity" TEXT NOT NULL DEFAULT 'Jeddah',
    "toCity" TEXT NOT NULL DEFAULT 'Makkah',
    "priceSar" DOUBLE PRECISION NOT NULL,
    "vehicleId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TransportRouteRate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Hotel" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "stars" INTEGER NOT NULL DEFAULT 5,
    "distance" TEXT NOT NULL,
    "address" TEXT,
    "startingPrice" DOUBLE PRECISION NOT NULL,
    "image" TEXT NOT NULL,
    "gallery" TEXT[],
    "description" TEXT NOT NULL,
    "amenities" TEXT[],
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Hotel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HotelRoom" (
    "id" TEXT NOT NULL,
    "roomType" TEXT NOT NULL,
    "capacity" INTEGER NOT NULL DEFAULT 2,
    "pricePerNight" DOUBLE PRECISION NOT NULL,
    "hasKaabaView" BOOLEAN NOT NULL DEFAULT false,
    "hotelId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HotelRoom_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ZiyaratTour" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "duration" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "gallery" TEXT[],
    "placesCovered" TEXT[],
    "priceSedan" DOUBLE PRECISION NOT NULL,
    "priceVan" DOUBLE PRECISION,
    "priceSuv" DOUBLE PRECISION,
    "includes" TEXT[],
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ZiyaratTour_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UaeCityTour" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "category" TEXT NOT NULL DEFAULT 'City Sightseeing',
    "duration" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "gallery" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "highlights" TEXT[],
    "priceAed" DOUBLE PRECISION NOT NULL,
    "pricePerPerson" DOUBLE PRECISION,
    "privateCarPrice" DOUBLE PRECISION,
    "inclusions" TEXT[],
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UaeCityTour_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DesertSafariPackage" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "packageType" TEXT NOT NULL,
    "timing" TEXT NOT NULL,
    "priceAed" DOUBLE PRECISION NOT NULL,
    "vipPriceAed" DOUBLE PRECISION,
    "image" TEXT NOT NULL,
    "gallery" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "description" TEXT NOT NULL,
    "activities" TEXT[],
    "includes" TEXT[],
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DesertSafariPackage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RentalCar" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "year" INTEGER NOT NULL DEFAULT 2024,
    "seats" INTEGER NOT NULL DEFAULT 5,
    "transmission" TEXT NOT NULL DEFAULT 'Automatic',
    "fuelType" TEXT NOT NULL DEFAULT 'Petrol',
    "image" TEXT NOT NULL,
    "gallery" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "dailyPriceAed" DOUBLE PRECISION NOT NULL,
    "weeklyPriceAed" DOUBLE PRECISION,
    "monthlyPriceAed" DOUBLE PRECISION,
    "securityDeposit" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "freeMileagePerDay" INTEGER NOT NULL DEFAULT 250,
    "features" TEXT[],
    "isSelfDrive" BOOLEAN NOT NULL DEFAULT true,
    "withDriverOption" BOOLEAN NOT NULL DEFAULT true,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RentalCar_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Inquiry" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "service" TEXT,
    "subject" TEXT,
    "message" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'NEW',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Inquiry_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AdminUser_email_key" ON "AdminUser"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Booking_bookingNumber_key" ON "Booking"("bookingNumber");

-- CreateIndex
CREATE INDEX "Booking_serviceType_idx" ON "Booking"("serviceType");

-- CreateIndex
CREATE INDEX "Booking_status_idx" ON "Booking"("status");

-- CreateIndex
CREATE UNIQUE INDEX "TransportVehicle_slug_key" ON "TransportVehicle"("slug");

-- CreateIndex
CREATE INDEX "TransportRouteRate_vehicleId_idx" ON "TransportRouteRate"("vehicleId");

-- CreateIndex
CREATE INDEX "TransportRouteRate_fromCity_toCity_idx" ON "TransportRouteRate"("fromCity", "toCity");

-- CreateIndex
CREATE UNIQUE INDEX "Hotel_slug_key" ON "Hotel"("slug");

-- CreateIndex
CREATE INDEX "Hotel_city_idx" ON "Hotel"("city");

-- CreateIndex
CREATE INDEX "HotelRoom_hotelId_idx" ON "HotelRoom"("hotelId");

-- CreateIndex
CREATE UNIQUE INDEX "ZiyaratTour_slug_key" ON "ZiyaratTour"("slug");

-- CreateIndex
CREATE INDEX "ZiyaratTour_city_idx" ON "ZiyaratTour"("city");

-- CreateIndex
CREATE UNIQUE INDEX "UaeCityTour_slug_key" ON "UaeCityTour"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "DesertSafariPackage_slug_key" ON "DesertSafariPackage"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "RentalCar_slug_key" ON "RentalCar"("slug");

-- CreateIndex
CREATE INDEX "RentalCar_category_idx" ON "RentalCar"("category");

-- AddForeignKey
ALTER TABLE "TransportRouteRate" ADD CONSTRAINT "TransportRouteRate_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "TransportVehicle"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HotelRoom" ADD CONSTRAINT "HotelRoom_hotelId_fkey" FOREIGN KEY ("hotelId") REFERENCES "Hotel"("id") ON DELETE CASCADE ON UPDATE CASCADE;
