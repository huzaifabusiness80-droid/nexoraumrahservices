import { servicesData } from "@/lib/data/servicesData";

export interface SearchPage {
  title: string;
  href: string;
  description: string;
  keywords: string;
  category: string;
}

const serviceSearchTerms: Record<string, string> = {
  "umrah-transport":
    "taxi cab transfer airport pickup dropoff chauffeur ride car vehicle bus van Jeddah Makkah Mecca Madinah Medina Saudi Arabia",
  "umrah-hotels":
    "hotel accommodation lodging room stay reservation booking Makkah Mecca Madinah Medina Haram Kaaba",
  "umrah-ziyarat":
    "ziyarat sightseeing pilgrimage religious islamic landmarks history sacred holy mosque mountain cave Makkah Mecca Madinah Medina",
  "uae-city-tours":
    "tour sightseeing downtown Dubai Abu Dhabi landmarks Emirates Sharjah attractions tourist",
  "uae-desert-safari":
    "adventure dunes dune bashing 4x4 quad camel BBQ dinner evening desert trip",
  "uae-car-rental":
    "rent hire driving self drive chauffeur economy sedan SUV Dubai Sharjah Abu Dhabi cars vehicle",
};

const servicePages: SearchPage[] = servicesData.map((service) => ({
  title: service.title,
  href: `/services/${service.slug}`,
  description: service.shortDescription,
  keywords: [
    service.category,
    service.shortTitle,
    service.fullDescription,
    ...service.highlights,
    ...service.features.flatMap((feature) => [feature.title, feature.desc]),
    serviceSearchTerms[service.slug],
  ].join(" "),
  category: `${service.category} service`,
}));

export const searchablePages: SearchPage[] = [
  {
    title: "Home",
    href: "/",
    description: "Explore Nexora Journeys travel and pilgrimage services.",
    keywords: "homepage home Nexora Journeys Umrah travel agency",
    category: "Page",
  },
  {
    title: "About Us",
    href: "/about",
    description: "Learn about Nexora Journeys and our travel services.",
    keywords: "company about Nexora Journeys team",
    category: "Page",
  },
  ...servicePages,
  {
    title: "Contact",
    href: "/contact",
    description: "Get in touch with the Nexora Journeys team.",
    keywords: "contact support help inquiry phone WhatsApp",
    category: "Page",
  },
];

const ignoredQueryWords = new Set([
  "a",
  "an",
  "and",
  "are",
  "best",
  "book",
  "booking",
  "can",
  "cheap",
  "find",
  "for",
  "from",
  "help",
  "how",
  "i",
  "in",
  "looking",
  "me",
  "much",
  "my",
  "near",
  "need",
  "of",
  "on",
  "please",
  "show",
  "the",
  "to",
  "want",
  "with",
]);

export function searchPages(query: string): SearchPage[] {
  const normalizedQuery = query.toLocaleLowerCase().trim();
  const terms = normalizedQuery
    .split(/[^a-z0-9]+/)
    .filter((term) => term && !ignoredQueryWords.has(term));

  if (terms.length === 0) return [];

  const matches = searchablePages
    .map((page) => {
      const title = page.title.toLocaleLowerCase();
      const searchableText = `${title} ${page.description} ${page.keywords}`.toLocaleLowerCase();
      const matchingTerms = terms.filter((term) => searchableText.includes(term)).length;

      if (matchingTerms === 0) return null;

      const titleMatches = terms.filter((term) => title.includes(term)).length;
      const exactTitleMatch = title.includes(normalizedQuery) ? 100 : 0;

      return {
        page,
        completeMatch: matchingTerms === terms.length,
        score: exactTitleMatch + titleMatches * 10 + matchingTerms,
      };
    })
    .filter(
      (result): result is { page: SearchPage; completeMatch: boolean; score: number } =>
        result !== null
    );
  const completeMatches = matches.filter((result) => result.completeMatch);
  const bestMatches = completeMatches.length ? completeMatches : matches;

  return bestMatches
    .sort((a, b) => b.score - a.score)
    .map(({ page }) => page);
}
