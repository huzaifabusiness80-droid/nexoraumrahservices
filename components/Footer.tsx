"use client";

import Link from "next/link";
import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <>
      <footer className="w-full bg-[#11151c] text-white pt-16 sm:pt-20 pb-12 font-sans border-t border-zinc-800/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main 4 Columns Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-14 border-b border-zinc-800/70">
            {/* Col 1: Brand & Bio */}
            <div className="lg:col-span-4 space-y-6">
              {/* Luxury Car Logo */}
              <div className="flex items-center gap-2">
                <svg
                  viewBox="0 0 160 50"
                  fill="none"
                  className="h-9 w-auto text-[#d4af37]"
                >
                  <path
                    d="M10 38C25 36 35 34 50 25C65 16 95 14 115 16C130 17 145 22 150 28"
                    stroke="#d4af37"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  <path
                    d="M30 40H140"
                    stroke="#d4af37"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <text
                    x="20"
                    y="45"
                    fill="#d4af37"
                    fontSize="22"
                    fontWeight="800"
                    letterSpacing="4"
                    fontFamily="sans-serif"
                  >
                    NEXORA
                  </text>
                </svg>
              </div>

              {/* Company Description */}
              <p className="text-zinc-400 text-xs sm:text-[13px] leading-relaxed max-w-sm">
                {t.footerDesc}
              </p>

              {/* Social Icons (Facebook, WhatsApp, Snapchat) */}
              <div className="flex items-center gap-4 text-zinc-400">
                {/* Facebook */}
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white/[0.05] hover:bg-[#c5a059] hover:text-black flex items-center justify-center transition-all duration-200"
                  aria-label="Facebook"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>

                {/* WhatsApp */}
                <a
                  href="https://wa.me/923158494785"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white/[0.05] hover:bg-[#25D366] hover:text-white flex items-center justify-center transition-all duration-200"
                  aria-label="WhatsApp"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86.173.086.275.072.376-.044.101-.116.433-.506.549-.68.116-.173.231-.145.39-.086s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.099.824z" />
                  </svg>
                </a>

                {/* Snapchat */}
                <a
                  href="https://snapchat.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white/[0.05] hover:bg-[#FFFC00] hover:text-black flex items-center justify-center transition-all duration-200"
                  aria-label="Snapchat"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12.003 2c-3.13 0-5.603 2.146-5.603 4.966 0 .543.109 1.208.312 1.838.077.24.167.48.258.705-.444.137-.96.34-1.353.645-.487.378-.654.853-.472 1.336.195.518.736.812 1.488.812.35 0 .72-.066 1.08-.184.072.482.26 1.144.57 1.821.368.805.892 1.528 1.524 2.106-.576.248-1.229.479-1.921.688-.81.246-1.554.472-2.13.684-.69.254-.848.56-.838.932.012.443.344.838 1.077 1.272.935.553 2.298.98 3.939 1.239.352.055.674.316.828.669.176.402.104.832-.194 1.168-.168.188-.414.364-.73.52-.77.382-1.892.744-1.892 1.442 0 .428.324.757.943.957.779.252 1.884.28 3.19.083.563-.085 1.16-.24 1.767-.442.275-.092.56-.129.837-.129.28 0 .567.037.842.129.607.202 1.204.357 1.767.442 1.306.197 2.411.169 3.19-.083.619-.2 1.043-.529 1.043-.957 0-.698-1.122-1.06-1.892-1.442-.316-.156-.562-.332-.73-.52-.298-.336-.37-.766-.194-1.168.154-.353.476-.614.828-.669 1.641-.259 3.004-.686 3.939-1.239.733-.434 1.065-.829 1.077-1.272.01-.372-.148-.678-.838-.932-.576-.212-1.32-.438-2.13-.684-.692-.209-1.345-.44-1.921-.688.632-.578 1.156-1.301 1.524-2.106.31-.677.498-1.339.57-1.821.36.118.73.184 1.08.184.752 0 1.293-.294 1.488-.812.182-.483.015-.958-.472-1.336-.393-.305-.909-.508-1.353-.645.091-.225.181-.465.258-.705.203-.63.312-1.295.312-1.838 0-2.82-2.473-4.966-5.603-4.966z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Col 2: Site Map */}
            <div className="lg:col-span-2 space-y-4">
              <h4 className="text-sm font-bold text-white tracking-wider uppercase">
                {t.footerSiteMap}
              </h4>
              <ul className="space-y-3 text-xs sm:text-[13px] text-zinc-400">
                <li>
                  <Link href="/" className="hover:text-[#c5a059] transition-colors">
                    {t.navHome}
                  </Link>
                </li>
                <li>
                  <a href="#fleet" className="hover:text-[#c5a059] transition-colors">
                    {t.navFleet}
                  </a>
                </li>
                <li>
                  <a href="#about" className="hover:text-[#c5a059] transition-colors">
                    {t.navAbout}
                  </a>
                </li>
                <li>
                  <a href="#contact" className="hover:text-[#c5a059] transition-colors">
                    {t.navContact}
                  </a>
                </li>
              </ul>
            </div>

            {/* Col 3: Vehicle Capacity Guide */}
            <div className="lg:col-span-3 space-y-4">
              <h4 className="text-sm font-bold text-white tracking-wider uppercase">
                {t.footerCapacityGuide}
              </h4>
              <ul className="space-y-3 text-xs sm:text-[13px] text-zinc-400">
                <li className="hover:text-[#c5a059] transition-colors cursor-pointer">
                  {t.cap1to10}
                </li>
                <li className="hover:text-[#c5a059] transition-colors cursor-pointer">
                  {t.cap1to4}
                </li>
                <li className="hover:text-[#c5a059] transition-colors cursor-pointer">
                  {t.cap1to7}
                </li>
                <li className="hover:text-[#c5a059] transition-colors cursor-pointer">
                  {t.cap20to22}
                </li>
              </ul>
            </div>

            {/* Col 4: Contact Us & Newsletter */}
            <div className="lg:col-span-3 space-y-4">
              <h4 className="text-sm font-bold text-white tracking-wider uppercase">
                {t.footerContactUs}
              </h4>
              <p className="text-xs text-zinc-400">
                {t.footerNewsletterSub}
              </p>

              <form onSubmit={handleSubscribe} className="space-y-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t.footerEmailPlaceholder}
                  required
                  className="w-full px-4 py-3 bg-[#181c24] border border-zinc-700/70 text-white placeholder-zinc-500 text-xs focus:outline-none focus:border-[#c5a059] rounded transition-colors"
                />

                <button
                  type="submit"
                  className="w-full py-3 border border-[#c5a059] text-white hover:bg-[#c5a059] hover:text-black text-[11px] font-bold tracking-[0.2em] uppercase transition-all duration-300 rounded shadow-sm cursor-pointer"
                >
                  {subscribed ? t.footerSubscribedBtn : t.footerSubscribeBtn}
                </button>
              </form>
            </div>
          </div>

          {/* Bottom Copyright Row */}
          <div className="pt-8 text-center text-xs text-zinc-500">
            <p>
              {t.footerCopyright}
            </p>
          </div>
        </div>
      </footer>

      {/* Floating Action Buttons */}
      {/* 1. Floating Phone Call Button (Bottom Left) */}
      <a
        href="tel:03158494785"
        className="fixed bottom-4 sm:bottom-6 left-4 sm:left-6 z-50 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#00D06C] text-white flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all duration-200 group"
        aria-label="Call Us"
      >
        <span className="absolute inset-0 rounded-full bg-[#00D06C] animate-ping opacity-25" />
        <svg
          className="w-5 h-5 sm:w-6 sm:h-6 fill-current relative z-10"
          viewBox="0 0 24 24"
        >
          <path d="M20 15.5c-1.2 0-2.4-.2-3.6-.6-.3-.1-.7 0-1 .2l-2.2 2.2c-2.8-1.4-5.1-3.8-6.6-6.6l2.2-2.2c.3-.3.4-.7.2-1-.4-1.1-.6-2.3-.6-3.5 0-.6-.4-1-1-1H4c-.6 0-1 .4-1 1 0 9.4 7.6 17 17 17 .6 0 1-.4 1-1v-3.5c0-.6-.4-1-1-1z" />
        </svg>
      </a>

      {/* 2. Floating WhatsApp Button (Bottom Right) */}
      <a
        href="https://wa.me/923158494785?text=Salam%20Nexora,%20I%20would%20like%20to%20inquire%20about%20transportation%20services."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-50 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all duration-200 group"
        aria-label="Chat on WhatsApp"
      >
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-25" />
        <svg
          className="w-6 h-6 sm:w-7 sm:h-7 fill-current relative z-10"
          viewBox="0 0 24 24"
        >
          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86.173.086.275.072.376-.044.101-.116.433-.506.549-.68.116-.173.231-.145.39-.086s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.099.824z" />
        </svg>
      </a>
    </>
  );
}
