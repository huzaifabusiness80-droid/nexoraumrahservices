type HotelPricing = {
  isContactPricing?: boolean;
  priceValidFrom?: string | null;
  priceValidUntil?: string | null;
  startingPrice?: number | null;
  rooms?: Array<{ pricePerNight?: number }>;
};

export function isHotelPriceAvailable(
  hotel: HotelPricing,
  _today?: string
) {
  // If the admin checked "Contact for pricing", pricing should not show
  if (hotel.isContactPricing) return false;

  // If startingPrice is 0 and rooms are empty or all 0, no pricing is written
  if (typeof hotel.startingPrice === "number" && hotel.startingPrice <= 0) {
    if (Array.isArray(hotel.rooms) && hotel.rooms.length > 0) {
      const hasRoomPrice = hotel.rooms.some((r) => Number(r.pricePerNight) > 0);
      if (!hasRoomPrice) return false;
    } else {
      return false;
    }
  }

  // Pricing is written and available
  return true;
}

export function formatHotelPriceValidity(from?: string | null, until?: string | null) {
  if (!from && !until) return null;
  const formatDate = (value: string) =>
    new Date(`${value}T00:00:00.000Z`).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
      timeZone: "UTC",
    });
  if (from && until) return `${formatDate(from)} – ${formatDate(until)}`;
  if (from) return `From ${formatDate(from)}`;
  return until ? `Until ${formatDate(until)}` : null;
}

export function isValidHotelDate(value: unknown): value is string {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(`${value}T00:00:00.000Z`);
  return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value;
}
