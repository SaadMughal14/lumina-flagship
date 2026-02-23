"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

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
        <section className="relative w-full bg-[#0B0C10] py-32 px-6 lg:px-24 border-t border-white/10 z-50">
            <div className="max-w-4xl mx-auto">
                <h2 className="font-bricolage text-4xl lg:text-5xl text-white uppercase tracking-wider mb-16 text-center lg:text-left font-medium">
                    Enquiries
                </h2>

                <div className="space-y-4">
                    {faqs.map((faq, index) => {
                        const isOpen = openIndex === index;
                        return (
                            <div
                                key={index}
                                className="border-b border-white/10 pb-4 cursor-pointer group"
                                onClick={() => toggle(index)}
                            >
                                <div className="flex items-center justify-between py-6">
                                    <h3 className="font-bricolage text-xl lg:text-2xl text-white tracking-widest transition-colors group-hover:text-white/80 font-normal">
                                        {faq.question}
                                    </h3>
                                    <div className="text-white">
                                        {isOpen ? <Minus strokeWidth={1} /> : <Plus strokeWidth={1} />}
                                    </div>
                                </div>
                                <div
                                    className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                                        }`}
                                >
                                    <p className="font-manrope text-white/50 text-[15px] tracking-wide font-light leading-loose pb-6 pr-8">
                                        {faq.answer}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
