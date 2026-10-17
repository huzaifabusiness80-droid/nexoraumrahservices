type HotelPricing = {
  isContactPricing?: boolean;
  priceValidFrom?: string | null;
  priceValidUntil?: string | null;
};

export function isHotelPriceAvailable(
  hotel: HotelPricing,
  today = new Date().toISOString().slice(0, 10)
) {
  if (hotel.isContactPricing) return false;
  if (hotel.priceValidFrom && today < hotel.priceValidFrom) return false;
  if (hotel.priceValidUntil && today > hotel.priceValidUntil) return false;
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
