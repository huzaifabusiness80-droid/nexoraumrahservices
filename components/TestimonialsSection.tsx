"use client";

import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

const avatarList = [
  "/images/avatars/mohammed.svg",
  "/images/avatars/samir.svg",
];

export default function TestimonialsSection() {
  const { t } = useLanguage();

  return (
    <section className="w-full bg-white py-14 sm:py-20 lg:py-24 font-sans border-t border-zinc-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Part: Title on Left, 2 Testimonial Cards on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-14 sm:mb-20 lg:mb-28">
          {/* Left Column: Heading and Rating */}
          <div className="lg:col-span-4 flex flex-col justify-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-zinc-900 tracking-wider uppercase mb-4">
              {t.testimonialsTag}
            </h2>
            <p className="text-xs sm:text-sm text-zinc-500 tracking-widest uppercase">
              {t.testimonialsHeadingLine1} {t.testimonialsHeadingLine2} {t.testimonialsHeadingLine3} {t.testimonialsHeadingLine4}
            </p>

            <div className="mt-5 space-y-1">
              <p className="text-sm font-bold text-zinc-800 tracking-wide" dir="ltr">
                {t.testimonialsAvgRating}
              </p>
              <p className="text-xs text-zinc-500 font-medium">
                {t.testimonialsRatingSub}
              </p>
            </div>
          </div>

          {/* Right Column: 2 Cards */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 lg:gap-8">
            {t.testimonialsList.map((item, idx) => (
              <div
                key={idx}
                className="group flex flex-col items-center text-center p-8 sm:p-10 bg-[#f4f5f7] rounded-2xl shadow-sm hover:shadow-md transition-all duration-300"
              >
                {/* Avatar */}
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden mb-6 shadow-sm group-hover:scale-105 transition-transform duration-300">
                  <Image
                    src={avatarList[idx] || avatarList[0]}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Review Text */}
                <p className="text-zinc-600 text-[13.5px] sm:text-sm leading-relaxed mb-6 flex-1 max-w-sm">
                  {item.review}
                </p>

                {/* Author Name */}
                <h3 className="text-base sm:text-lg font-bold text-zinc-900 tracking-tight">
                  {item.name}
                </h3>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Part: Statement Banner */}
        <div className="text-center pt-8 border-t border-zinc-100">
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-zinc-900 tracking-wider uppercase leading-snug max-w-4xl mx-auto">
            {t.bannerStatementTag}
          </h3>
          <p className="mt-3 text-xs sm:text-sm text-zinc-500 tracking-widest uppercase">
            {t.bannerStatementText}
          </p>
        </div>
      </div>
    </section>
  );
}
