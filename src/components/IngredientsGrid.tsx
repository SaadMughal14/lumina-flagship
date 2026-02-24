const SmokedAgarwoodIcon = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
        {/* Animated smoky paths */}
        <path d="M12 22C12 22 17 18 17 13C17 10.2386 14.7614 8 12 8C9.23858 8 7 10.2386 7 13C7 18 12 22 12 22Z" className="animate-pulse" />
        <path d="M12 18C12 18 15 15.5 15 12.5C15 10.567 13.6569 9 12 9C10.3431 9 9 10.567 9 12.5C9 15.5 12 18 12 18Z" className="animate-[pulse_2s_infinite_1s]" opacity="0.6" />
        <circle cx="12" cy="13" r="1.5" fill="currentColor" className="animate-bounce" />
    </svg>
);

const AmbergrisIcon = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
        {/* Animated wave/oceanic path */}
        <path d="M2 12C2 12 5 9 8 12C11 15 13 15 16 12C19 9 22 12 22 12" className="animate-[scrollLine_3s_linear_infinite]" strokeLinecap="round" />
        <path d="M2 16C2 16 5 13 8 16C11 19 13 19 16 16C19 13 22 16 22 16" className="animate-[scrollLine_3s_linear_infinite_1.5s]" strokeLinecap="round" opacity="0.5" />
        <circle cx="12" cy="8" r="3" className="animate-pulse" />
    </svg>
);

const DarkSaffronIcon = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
        {/* Animated threads/burst */}
        <path d="M12 2V22M2 12H22M5.5 5.5L18.5 18.5M5.5 18.5L18.5 5.5" className="animate-spin-slow origin-center" strokeDasharray="2 2" />
        <circle cx="12" cy="12" r="6" className="animate-pulse" fill="currentColor" fillOpacity="0.1" />
        <path d="M12 9C12 9 10 11 10 13C10 14.1046 10.8954 15 12 15C13.1046 15 14 14.1046 14 13C14 11 12 9 12 9Z" className="animate-bounce" />
    </svg>
);

const ingredients = [
    {
        title: "Smoked Agarwood",
        category: "01 / BASE",
        description: "Sourced from the deep forests of Southasia, aged for unparalleled depth and woodsmoke character.",
        icon: SmokedAgarwoodIcon,
        color: "#C4A484" // Warm Earth/Amber
    },
    {
        title: "Ambergris",
        category: "02 / HEART",
        description: "Oceanic warmth that anchors the volatile top notes with a sophisticated, salty mineral glow.",
        icon: AmbergrisIcon,
        color: "#8AA2A9" // Slate Blue/Oceanic
    },
    {
        title: "Dark Saffron",
        category: "03 / TOP",
        description: "Hand-harvested crimson threads providing a leathery, spiced aura that defines the Lumina edge.",
        icon: DarkSaffronIcon,
        color: "#A64B2A" // Deep Spiced Red
    },
];

export default function IngredientsGrid() {
    return (
        <section className="relative w-full bg-[#0B0C10] py-32 px-6 lg:px-24 border-t border-white/10 z-50 overflow-hidden">
            {/* Brutalist Background Grid Overlay */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)", backgroundSize: "100px 100px" }}></div>

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="mb-32 flex flex-col lg:flex-row items-end justify-between gap-12">
                    <div className="max-w-2xl">
                        <span className="font-degular text-[10px] uppercase tracking-[0.5em] text-white/30 mb-4 block">Molecular Composition</span>
                        <h2 className="font-bricolage text-6xl lg:text-[8rem] text-white uppercase leading-[0.8] mb-8 font-black tracking-tighter">
                            The <br />
                            <span className="text-transparent" style={{ WebkitTextStroke: "1px white" }}>Alchemy</span>
                        </h2>
                    </div>
                    <p className="font-degular text-white/60 max-w-sm text-sm lg:text-base font-light leading-relaxed tracking-wide border-l border-white/20 pl-8 mb-4">
                        A precise curation of the world’s rarest raw materials, meticulously blended to forge an uncompromising signature. Modern brutalism meets olfactory liquid art.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 border-collapse">
                    {ingredients.map((item, i) => {
                        const Icon = item.icon;
                        return (
                            <div
                                key={i}
                                className="group relative p-12 lg:p-16 border border-white/10 flex flex-col justify-between transition-all duration-500 hover:bg-white/[0.02]"
                            >
                                {/* Brutalist Index */}
                                <div className="flex justify-between items-start mb-20">
                                    <span className="font-degular text-[11px] tracking-[0.3em] text-white/20 group-hover:text-white/80 transition-colors uppercase">
                                        {item.category}
                                    </span>
                                    <div
                                        className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center transition-all duration-500 group-hover:border-white/40 group-hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                                        style={{ color: item.color }}
                                    >
                                        <Icon className="w-6 h-6 transition-transform duration-700 group-hover:scale-110" />
                                    </div>
                                </div>

                                <div>
                                    <h3 className="font-bricolage text-3xl lg:text-4xl text-white tracking-tight mb-6 font-bold uppercase leading-none">
                                        {item.title}
                                    </h3>
                                    <p className="font-degular text-white/40 font-light leading-relaxed text-sm tracking-wide max-w-[240px] group-hover:text-white/70 transition-colors">
                                        {item.description}
                                    </p>
                                </div>

                                {/* Bottom Accent Line */}
                                <div
                                    className="absolute bottom-0 left-0 w-0 h-[2px] transition-all duration-700 ease-in-out group-hover:w-full"
                                    style={{ backgroundColor: item.color }}
                                ></div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

