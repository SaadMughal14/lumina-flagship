"use client";

import { useState } from "react";

const faqs = [
    {
        question: "What is the concentration of Lumina Extrait?",
        answer: "Lumina is formulated as an Extrait de Parfum with a 40% concentration of rare botanical oils, ensuring an extraordinary sillage and longevity.",
    },
    {
        question: "How long does the maceration process take?",
        answer: "Each batch undergoes a six-month dark maceration in bespoke oak barrels to perfectly marry the volatile top notes with our signature agarwood base.",
    },
    {
        question: "Are the ingredients ethically sourced?",
        answer: "Absolutely. Our ambergris is strictly beach-cast, and our agarwood is harvested in partnership with multi-generational certified plantations in Southasia.",
    },
];

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggle = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="relative w-full bg-[#0B0C10] py-32 px-6 lg:px-24 border-t border-white/[0.06] z-50 overflow-hidden">
            {/* Subtle ambient background line */}
            <div className="absolute top-0 left-1/2 w-[1px] h-full bg-gradient-to-b from-transparent via-white/[0.04] to-transparent pointer-events-none" />

            <div className="max-w-5xl mx-auto">
                {/* Section Header */}
                <div className="flex items-end justify-between mb-20 lg:mb-28">
                    <div>
                        <span className="font-degular text-[10px] uppercase tracking-[0.5em] text-white/25 mb-4 block">Knowledge Base</span>
                        <h2 className="font-bricolage text-4xl lg:text-6xl text-white uppercase tracking-tight font-bold leading-none">
                            Enquiries
                        </h2>
                    </div>
                    <span className="font-degular text-[10px] uppercase tracking-[0.3em] text-white/20 hidden lg:block">
                        {String(faqs.length).padStart(2, "0")} Items
                    </span>
                </div>

                {/* FAQ Items */}
                <div>
                    {faqs.map((faq, index) => {
                        const isOpen = openIndex === index;
                        return (
                            <div
                                key={index}
                                className="group cursor-pointer"
                                onClick={() => toggle(index)}
                            >
                                {/* Top separator with index marker */}
                                <div className="relative">
                                    <div className={`h-[1px] w-full transition-all duration-700 ${isOpen ? 'bg-white/20' : 'bg-white/[0.07] group-hover:bg-white/15'}`} />
                                    {/* Small index dot on the line */}
                                    <div className={`absolute -top-[3px] left-0 w-[6px] h-[6px] rounded-full transition-all duration-500 ${isOpen ? 'bg-white scale-100' : 'bg-white/30 scale-75 group-hover:bg-white/60 group-hover:scale-100'}`} />
                                </div>

                                <div className="flex items-start justify-between py-8 lg:py-10">
                                    {/* Left: index number */}
                                    <span className={`font-degular text-[11px] tracking-[0.2em] mr-8 lg:mr-12 transition-colors duration-500 mt-2 ${isOpen ? 'text-white/60' : 'text-white/15 group-hover:text-white/40'}`}>
                                        {String(index + 1).padStart(2, "0")}
                                    </span>

                                    {/* Center: question */}
                                    <div className="flex-1">
                                        <h3 className={`font-bricolage text-lg lg:text-2xl tracking-wide transition-colors duration-500 font-normal leading-snug ${isOpen ? 'text-white' : 'text-white/70 group-hover:text-white/90'}`}>
                                            {faq.question}
                                        </h3>

                                        {/* Answer */}
                                        <div className={`overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${isOpen ? "max-h-40 opacity-100 mt-5" : "max-h-0 opacity-0 mt-0"}`}>
                                            <p className="font-degular text-white/45 text-[14px] tracking-wide font-light leading-[1.8] max-w-xl">
                                                {faq.answer}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Right: open/close indicator */}
                                    <div className={`ml-8 mt-2 transition-all duration-500 ${isOpen ? 'rotate-45 text-white' : 'rotate-0 text-white/30 group-hover:text-white/60'}`}>
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                                            <line x1="8" y1="1" x2="8" y2="15" />
                                            <line x1="1" y1="8" x2="15" y2="8" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                    {/* Final bottom line */}
                    <div className="h-[1px] w-full bg-white/[0.07]" />
                </div>
            </div>
        </section>
    );
}
