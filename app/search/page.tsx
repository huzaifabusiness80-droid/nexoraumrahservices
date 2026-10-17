import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { searchablePages, searchPages } from "@/lib/data/siteSearch";
import { FaArrowRight, FaSearch } from "react-icons/fa";

export const instant = false;

interface SearchPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function SearchResultsPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const query = typeof params.q === "string" ? params.q.trim() : "";
  const results = query ? searchPages(query) : [];
  const popularPages = searchablePages.filter((page) => page.category !== "Page");
  const pagesToShow = results.length ? results : popularPages;

  return (
    <div className="flex min-h-screen flex-col bg-white font-sans text-zinc-900">
      <Header />

      <main className="flex-1">
        <section className="border-b border-zinc-200 bg-zinc-950 px-4 py-14 text-white sm:py-20">
          <div className="mx-auto max-w-5xl">
            <span className="mb-3 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#c5a059]">
              <FaSearch aria-hidden="true" />
              Nexora Journeys Search
            </span>
            <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              {query ? `Search results for “${query}”` : "Explore our services"}
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-300 sm:text-base">
              {results.length
                ? `We found ${results.length} ${results.length === 1 ? "destination" : "destinations"} matching your search.`
                : query
                  ? "We couldn't find an exact match. Explore our travel services below or try another search."
                  : "Search for a destination, hotel, transfer, tour, or rental service."}
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14">
          {!results.length && query && (
            <p className="mb-6 rounded-lg border border-[#c5a059]/30 bg-[#c5a059]/10 px-4 py-3 text-sm text-zinc-700">
              No results found for <strong>“{query}”</strong>.
            </p>
          )}

          <div className="grid gap-4 sm:grid-cols-2">
            {pagesToShow.map((page) => (
              <Link
                key={page.href}
                href={page.href}
                className="group rounded-xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-[#c5a059] hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#c5a059]"
              >
                <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#9b783b]">
                  {page.category}
                </span>
                <span className="mt-2 flex items-center justify-between gap-3 text-lg font-bold text-zinc-900">
                  {page.title}
                  <FaArrowRight
                    aria-hidden="true"
                    className="shrink-0 text-sm text-[#c5a059] transition-transform group-hover:translate-x-1"
                  />
                </span>
                <span className="mt-2 block text-sm leading-relaxed text-zinc-600">
                  {page.description}
                </span>
              </Link>
            ))}
          </div>

          {!results.length && query && (
            <p className="mt-8 text-sm text-zinc-600">
              Still need help?{" "}
              <Link href="/contact" className="font-semibold text-[#9b783b] underline underline-offset-4">
                Contact our team
              </Link>
              .
            </p>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
