"use client";

import { FormEvent, useId, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaSearch } from "react-icons/fa";
import { searchPages } from "@/lib/data/siteSearch";

interface HeaderSearchProps {
  className?: string;
}

export default function HeaderSearch({ className = "" }: HeaderSearchProps) {
  const router = useRouter();
  const inputId = useId();
  const [query, setQuery] = useState("");
  const results = query.trim() ? searchPages(query).slice(0, 5) : [];

  const submitSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const searchTerm = query.trim();
    if (!searchTerm) return;
    router.push(`/search?q=${encodeURIComponent(searchTerm)}`);
  };

  return (
    <div className={`relative ${className}`}>
      <form
        action="/search"
        method="get"
        role="search"
        onSubmit={submitSearch}
        className="flex h-11 items-center gap-2 rounded-full border border-zinc-300 bg-white px-4 shadow-sm transition focus-within:border-[#c5a059] focus-within:ring-2 focus-within:ring-[#c5a059]/20"
      >
        <label htmlFor={inputId} className="sr-only">
          Search Nexora Journeys
        </label>
        <FaSearch aria-hidden="true" className="shrink-0 text-sm text-zinc-500" />
        <input
          id={inputId}
          type="search"
          name="q"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search destinations..."
          autoComplete="off"
          className="min-w-0 flex-1 bg-transparent text-sm text-zinc-900 outline-none placeholder:text-zinc-400"
        />
        <button
          type="submit"
          aria-label="Search"
          className="shrink-0 text-xs font-semibold text-[#9b783b] transition hover:text-black"
        >
          Search
        </button>
      </form>

      {query.trim() && (
        <div className="absolute left-0 right-0 top-full z-[60] mt-2 overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-xl">
          <div className="border-b border-zinc-100 px-4 py-2.5 text-[10px] font-bold uppercase tracking-[0.16em] text-zinc-400">
            {results.length ? "Suggested destinations" : "No exact matches"}
          </div>
          {results.length ? (
            <ul>
              {results.map((result) => (
                <li key={result.href}>
                  <Link
                    href={result.href}
                    onClick={() => setQuery("")}
                    className="block px-4 py-3 transition hover:bg-zinc-50 focus:bg-zinc-50 focus:outline-none"
                  >
                    <span className="block text-sm font-semibold text-zinc-900">{result.title}</span>
                    <span className="mt-0.5 block truncate text-xs text-zinc-500">
                      {result.description}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="px-4 py-3 text-sm text-zinc-600">
              Press Search to explore all available destinations.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
