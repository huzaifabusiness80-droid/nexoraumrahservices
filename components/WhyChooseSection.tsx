"use client";

import { useLanguage } from "@/context/LanguageContext";

const featureIcons: Record<string, React.ReactNode> = {
  "modern-vehicles": (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="#ffffff"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-10 h-10"
    >
      <path d="M2 4l3 12h14l3-12-6 7-4-7-4 7-6-7z" />
      <path d="M5 20h14" />
    </svg>
  ),
  "safe-reliable": (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="#ffffff"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-10 h-10"
    >
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  ),
  availability: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="#ffffff"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-10 h-10"
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  ),
};

export default function WhyChooseSection() {
  const { t } = useLanguage();
  const targetPhone = "923158494785";

  return (
    <section id="about" className="w-full bg-[#f4f5f7] py-14 sm:py-20 lg:py-24 font-sans">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-zinc-900 tracking-wider uppercase">
            {t.whyChooseTag}
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-zinc-500 tracking-widest uppercase">
            {t.whyChooseHeading}
          </p>
        </div>

        {/* 3 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
          {t.whyChooseFeatures.map((feature) => (
            <a
              key={feature.id}
              href={`https://wa.me/${targetPhone}?text=${encodeURIComponent(
                `Salam Nexora, I would like to inquire about ${feature.title}.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center text-center p-6 sm:p-8 lg:p-10 bg-white border border-transparent hover:border-black transition-all duration-300 cursor-pointer"
            >
              {/* Peach Circle Badge */}
              <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 !rounded-full bg-[#ecc298] flex items-center justify-center mb-6 shadow-sm group-hover:scale-105 transition-transform duration-300 shrink-0">
                {featureIcons[feature.id] || featureIcons["modern-vehicles"]}
              </div>

              {/* Title */}
              <h3 className="text-base sm:text-lg lg:text-xl font-bold text-zinc-900 tracking-tight mb-3 min-h-[2.5rem] sm:min-h-[3.25rem] flex items-center justify-center group-hover:text-[#c5a059] transition-colors">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-zinc-600 text-xs sm:text-[13.5px] lg:text-sm leading-relaxed max-w-xs">
                {feature.description}
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
