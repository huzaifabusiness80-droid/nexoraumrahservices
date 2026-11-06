import prisma from "@/lib/prisma";

export async function linkAndGetClientBookings(
  client: { id: string; email: string }
) {
  await prisma.booking.updateMany({
    where: {
      clientId: null,
      customerEmail: {
        equals: client.email,
        mode: "insensitive",
      },
    },
    data: { clientId: client.id },
  });

  return prisma.booking.findMany({
    where: {
      OR: [{ clientId: client.id }, {
        clientId: null,
        customerEmail: { equals: client.email, mode: "insensitive" },
      }],
    },
    orderBy: [{ pickupDate: "asc" }, { createdAt: "desc" }],
  });
}
