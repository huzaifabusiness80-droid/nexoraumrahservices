import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const cars = await prisma.rentalCar.findMany({ orderBy: { order: "asc" } });
    return NextResponse.json({ success: true, cars });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      name,
      slug,
      category,
      brand,
      year,
      seats,
      transmission,
      fuelType,
      image,
      dailyPriceAed,
      weeklyPriceAed,
      monthlyPriceAed,
      securityDeposit,
      freeMileagePerDay,
      features,
      isSelfDrive,
      withDriverOption,
      isActive,
    } = body;

    const generatedSlug = slug
      ? slug.toLowerCase().replace(/[^a-z0-9]+/g, "-")
      : name.toLowerCase().replace(/[^a-z0-9]+/g, "-");

    const car = await prisma.rentalCar.create({
      data: {
        name,
        slug: generatedSlug,
        category: category || "Executive Sedan",
        brand: brand || "Toyota",
        year: Number(year || 2024),
        seats: Number(seats || 5),
        transmission: transmission || "Automatic",
        fuelType: fuelType || "Petrol",
        image,
        dailyPriceAed: Number(dailyPriceAed || 0),
        weeklyPriceAed: weeklyPriceAed !== undefined ? Number(weeklyPriceAed) : null,
        monthlyPriceAed: monthlyPriceAed !== undefined ? Number(monthlyPriceAed) : null,
        securityDeposit: Number(securityDeposit || 0),
        freeMileagePerDay: Number(freeMileagePerDay || 250),
        features: Array.isArray(features) ? features : [],
        isSelfDrive: isSelfDrive !== undefined ? isSelfDrive : true,
        withDriverOption: withDriverOption !== undefined ? withDriverOption : true,
        isActive: isActive !== undefined ? isActive : true,
      },
    });

    return NextResponse.json({ success: true, car });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}
