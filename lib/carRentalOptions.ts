export const RENTAL_CAR_TYPES = [
  "Super Cars",
  "SUV",
  "Cabriolet",
  "Sedan",
  "Estate",
  "Coupe",
  "Hatchback",
  "Shooting Brake",
  "Roadster",
  "Electric Vehicles",
  "Truck",
] as const;

export const RENTAL_CAR_COMPANIES = [
  "Mercedes-AMG",
  "Nissan",
  "Bugatti",
  "Ferrari",
  "Mercedes-Benz",
  "Rolls Royce",
  "McLaren",
  "Lamborghini",
  "Range Rover",
  "Audi",
  "GMC",
  "Cadillac",
  "Corvette",
  "Tesla",
  "Toyota",
] as const;

export const LEGACY_RENTAL_CAR_TYPE_MAP: Record<string, string> = {
  "executive sedan": "Sedan",
  "economy sedan": "Sedan",
  "luxury suv": "SUV",
  "vip luxury suv": "SUV",
  "vip full-size luxury suv": "SUV",
  "7-seater family mpv": "SUV",
  "sports & exotic": "Super Cars",
};

export const LEGACY_RENTAL_CAR_COMPANY_MAP: Record<string, string> = {
  Mercedes: "Mercedes-Benz",
  "Rolls-Royce": "Rolls Royce",
  Mclaren: "McLaren",
};
