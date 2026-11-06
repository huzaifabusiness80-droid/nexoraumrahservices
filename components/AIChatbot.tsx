"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { FaPaperPlane, FaRobot, FaTimes } from "react-icons/fa";
import { useLanguage } from "@/context/LanguageContext";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

export default function AIChatbot() {
  const { language, isRtl } = useLanguage();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const welcome =
    language === "ar"
      ? "السلام عليكم! میں نکسورا اسسٹنٹ ہوں۔ میں عمرہ ٹرانسپورٹ، زیارت، ہوٹل اور یو اے ای ٹورز میں آپ کی رہنمائی کر سکتا ہوں۔"
      : "Assalamu Alaikum! I’m Nexora Assistant. How can I help with Umrah transport, Ziyarat, hotels, or UAE tours?";

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading, open]);

  async function sendMessage(event: FormEvent) {
    event.preventDefault();
    const message = input.trim();
    if (!message || loading) return;

    const nextMessages: ChatMessage[] = [
      ...messages,
      { role: "user", content: message },
    ];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message,
          history: nextMessages.slice(-8, -1),
        }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Unable to contact the assistant.");
      }

      setMessages((current) => [
        ...current,
        { role: "assistant", content: data.reply },
      ]);
    } catch (error) {
      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content:
            error instanceof Error
              ? error.message
              : "Please try again shortly.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  const suggestions =
    language === "ar"
      ? ["Makkah سے Madinah ٹرانسپورٹ", "Jeddah airport transfer", "Ziyarat tour"]
      : ["Jeddah airport transfer", "Makkah to Madinah transport", "Ziyarat tour"];

  return (
    <div
      className="fixed bottom-5 left-5 z-[70] flex flex-col items-start sm:bottom-6 sm:left-6"
      dir={isRtl ? "rtl" : "ltr"}
    >
      {open && (
        <section
          className="mb-3 flex h-[520px] max-h-[calc(100vh-110px)] w-[calc(100vw-40px)] flex-col overflow-hidden rounded-2xl border border-black/10 bg-white shadow-[0_18px_60px_rgba(0,0,0,0.22)] sm:w-[380px]"
          aria-label="Nexora AI Assistant"
        >
          <header className="flex items-center justify-between bg-[#18191c] px-4 py-3.5 text-white">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#c5a059]">
                <FaRobot className="text-lg" />
              </div>
              <div>
                <p className="text-sm font-bold">
                  {language === "ar" ? "نکسورا AI اسسٹنٹ" : "Nexora AI Assistant"}
                </p>
                <p className="mt-0.5 flex items-center gap-1.5 text-[10px] text-white/70">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  {language === "ar" ? "آن لائن · 24/7" : "Online · 24/7"}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="flex h-8 w-8 items-center justify-center rounded-full text-white/70 transition hover:bg-white/10 hover:text-white"
              aria-label="Close assistant"
            >
              <FaTimes />
            </button>
          </header>

          <div className="flex-1 space-y-3 overflow-y-auto bg-[#faf9f6] px-3 py-4">
            <div className="flex max-w-[88%] rounded-2xl rounded-bl-md bg-white px-3.5 py-3 text-sm leading-6 text-zinc-700 shadow-sm ring-1 ring-black/5">
              {welcome}
            </div>

            {messages.map((message, index) => (
              <div
                key={`${message.role}-${index}`}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[88%] whitespace-pre-wrap rounded-2xl px-3.5 py-3 text-sm leading-6 ${
                    message.role === "user"
                      ? "rounded-br-md bg-[#18191c] text-white"
                      : "rounded-bl-md bg-white text-zinc-700 shadow-sm ring-1 ring-black/5"
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="flex gap-1 rounded-2xl rounded-bl-md bg-white px-4 py-3 shadow-sm ring-1 ring-black/5">
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#c5a059]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#c5a059] [animation-delay:150ms]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#c5a059] [animation-delay:300ms]" />
                </div>
              </div>
            )}

            {messages.length === 0 && (
              <div className="flex flex-wrap gap-2 pt-1">
                {suggestions.map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    onClick={() => setInput(suggestion)}
                    className="rounded-full border border-[#c5a059]/40 bg-white px-3 py-2 text-xs font-medium text-zinc-700 transition hover:border-[#c5a059] hover:bg-[#f5eedf]"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form
            onSubmit={sendMessage}
            className="flex items-center gap-2 border-t border-black/10 bg-white p-3"
          >
            <input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder={
                language === "ar" ? "اپنا سوال لکھیں..." : "Type your question..."
              }
              maxLength={2000}
              className="min-w-0 flex-1 rounded-full border border-zinc-200 px-4 py-3 text-sm outline-none transition focus:border-[#c5a059] focus:ring-2 focus:ring-[#c5a059]/20"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#c5a059] text-white transition hover:bg-[#9f7d3b] disabled:cursor-not-allowed disabled:opacity-50"
              aria-label="Send message"
            >
              <FaPaperPlane className="text-sm" />
            </button>
          </form>
        </section>
      )}

      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className={`relative flex h-14 w-14 items-center justify-center rounded-full bg-[#18191c] text-white shadow-[0_12px_30px_rgba(0,0,0,0.28)] ring-4 ring-white transition-all duration-200 hover:scale-105 active:scale-95 sm:h-16 sm:w-16 ${open ? "rotate-0" : ""}`}
        aria-label={open ? "Close Nexora AI Assistant" : "Open Nexora AI Assistant"}
        aria-expanded={open}
      >
        {open ? <FaTimes className="text-xl" /> : <FaRobot className="text-2xl sm:text-3xl" />}
        {!open && (
          <span className="absolute right-0 top-0 h-3 w-3 rounded-full border-2 border-white bg-emerald-500" />
        )}
      </button>
    </div>
  );
}
