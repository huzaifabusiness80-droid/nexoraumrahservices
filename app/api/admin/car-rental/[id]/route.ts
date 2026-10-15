import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const car = await prisma.rentalCar.findUnique({ where: { id } });
    if (!car) return NextResponse.json({ error: "Car not found" }, { status: 404 });
    return NextResponse.json({ success: true, car });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await req.json();
    const {
      name,
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

    const updated = await prisma.rentalCar.update({
      where: { id },
      data: {
        name,
        category,
        brand,
        year: year !== undefined ? Number(year) : undefined,
        seats: seats !== undefined ? Number(seats) : undefined,
        transmission,
        fuelType,
        image,
        dailyPriceAed: dailyPriceAed !== undefined ? Number(dailyPriceAed) : undefined,
        weeklyPriceAed: weeklyPriceAed !== undefined ? Number(weeklyPriceAed) : null,
        monthlyPriceAed: monthlyPriceAed !== undefined ? Number(monthlyPriceAed) : null,
        securityDeposit: securityDeposit !== undefined ? Number(securityDeposit) : undefined,
        freeMileagePerDay: freeMileagePerDay !== undefined ? Number(freeMileagePerDay) : undefined,
        features: Array.isArray(features) ? features : undefined,
        isSelfDrive: isSelfDrive !== undefined ? isSelfDrive : undefined,
        withDriverOption: withDriverOption !== undefined ? withDriverOption : undefined,
        isActive: isActive !== undefined ? isActive : undefined,
      },
    });

    return NextResponse.json({ success: true, car: updated });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await prisma.rentalCar.delete({ where: { id } });
    return NextResponse.json({ success: true, message: "Car deleted" });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}
