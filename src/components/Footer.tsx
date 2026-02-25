"use client";

import { Instagram, FileText, Mail } from "lucide-react";

export default function Footer() {
    return (
        <footer className="relative w-full min-h-[100dvh] bg-[#0B0C10] flex flex-col justify-between items-center z-50 pt-32 pb-32 px-6 lg:px-24">
            {/* Top Section: Newsletter */}
            <div className="w-full max-w-2xl text-center relative">
                <span className="font-degular text-[10px] uppercase tracking-[0.5em] text-white/25 mb-6 block">Exclusive Access</span>
                <h2 className="font-bricolage text-3xl lg:text-5xl text-white tracking-tight font-bold mb-4 uppercase leading-none">
                    Join the Inner Circle
                </h2>
                <p className="font-degular text-white/30 text-sm tracking-wide mb-12 max-w-md mx-auto font-light">
                    Be the first to experience limited releases and private atelier events.
                </p>

                <form className="relative w-full max-w-md mx-auto" onSubmit={(e) => {
                    e.preventDefault();
                    const input = e.currentTarget.querySelector("input") as HTMLInputElement;
                    // Strip any HTML/script tags from the value
                    const sanitized = input.value.replace(/<[^>]*>/g, "").trim();
                    if (!sanitized || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(sanitized)) return;
                    // Future: send sanitized value to your API
                }}>
                    <div className="relative group">
                        <input
                            type="email"
                            placeholder="Your email address"
                            className="w-full bg-transparent border-b border-white/15 text-white font-degular font-light text-[14px] py-4 px-0 focus:outline-none focus:ring-0 focus:ring-offset-0 ring-0 hover:border-white/30 transition-all placeholder:text-white/15 tracking-wide outline-none shadow-none appearance-none"
                            required
                            maxLength={254}
                            pattern="[^\s@]+@[^\s@]+\.[^\s@]+"
                            autoComplete="email"
                        />
                        {/* Animated underline that fills on focus */}
                        <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-white transition-all duration-700 ease-out group-focus-within:w-full" />

                        <button
                            type="submit"
                            className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center gap-2 text-white/40 hover:text-white transition-all duration-300 group/btn"
                        >
                            <span className="font-degular text-[10px] tracking-[0.2em] uppercase hidden sm:inline">Submit</span>
                            <div className="w-8 h-8 rounded-full border border-white/15 flex items-center justify-center transition-all duration-300 hover:border-white/40 hover:bg-white/5">
                                <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" className="transition-transform duration-300 hover:translate-x-[1px]">
                                    <path d="M1 11L11 1M11 1H5M11 1V7" />
                                </svg>
                            </div>
                        </button>
                    </div>
                </form>
            </div>

            {/* Bottom Section: Giant Logo & Copyright */}
            <div className="w-full flex flex-col items-center mt-auto">
                {/* Horizontal rule with diamond */}
                <div className="flex items-center gap-4 mb-12 opacity-20">
                    <div className="w-16 lg:w-32 h-[1px] bg-white/50" />
                    <svg width="8" height="8" viewBox="0 0 8 8" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-white">
                        <rect x="4" y="0.5" width="4.95" height="4.95" transform="rotate(45 4 0.5)" />
                    </svg>
                    <div className="w-16 lg:w-32 h-[1px] bg-white/50" />
                </div>

                <div className="flex flex-col items-center gap-6 opacity-90 mb-10">
                    <h1 className="font-style-script text-7xl lg:text-9xl leading-none text-white capitalize font-normal" style={{ fontFamily: "var(--font-style-script)" }}>
                        Lumina
                    </h1>
                    <span className="font-degular text-[8px] uppercase tracking-[0.6em] text-white/20">Extrait de Parfum</span>
                </div>

                <div className="flex w-full justify-between items-center text-white/30 font-degular text-[10px] tracking-[0.2em] uppercase mt-8 border-t border-white/[0.06] pt-8 pb-10 lg:pb-16 lg:pr-10">
                    <span>&copy; {new Date().getFullYear()} Lumina Parfums</span>
                    <div className="flex gap-8 z-20">
                        <a href="https://instagram.com/batch_systems" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-white transition-colors duration-300 group">
                            <Instagram className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" strokeWidth={1.5} />
                            <span>Instagram</span>
                        </a>
                        <a href="#" className="flex items-center gap-2 hover:text-white transition-colors duration-300 group">
                            <FileText className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" strokeWidth={1.5} />
                            <span>Legal</span>
                        </a>
                        <a href="mailto:isaadimughal@gmail.com" className="flex items-center gap-2 hover:text-white transition-colors duration-300 group">
                            <Mail className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" strokeWidth={1.5} />
                            <span>Contact</span>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
