const PremiumFlame = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5">
        <path d="M12 2L18 12L12 22L6 12L12 2Z" />
        <circle cx="12" cy="15" r="2" />
    </svg>
);

const PremiumLiquid = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5">
        <path d="M12 3C12 3 5 11 5 16C5 19.866 8.13401 23 12 23C15.866 23 19 19.866 19 16C19 11 12 3 12 3Z" />
        <path d="M12 11V16" />
    </svg>
);

const PremiumCrescent = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5">
        <path d="M21 12.79A9 9 0 1 1 11.21 3A7 7 0 0 0 21 12.79Z" />
        <circle cx="10" cy="10" r="1" />
    </svg>
);

const ingredients = [
    {
        title: "Smoked Agarwood",
        description: "Sourced from the deep forests of Southasia, aged for unparalleled depth.",
        icon: PremiumFlame,
    },
    {
        title: "Ambergris",
        description: "Oceanic warmth that anchors the volatile top notes.",
        icon: PremiumLiquid,
    },
    {
        title: "Dark Saffron",
        description: "Hand-harvested crimson threads providing a leathery, spiced aura.",
        icon: PremiumCrescent,
    },
];

export default function IngredientsGrid() {
    return (
        <section className="relative w-full bg-[#0B0C10] py-32 px-6 lg:px-24 border-t border-white/10 z-50">
            <div className="max-w-7xl mx-auto">
                <div className="mb-20 text-center lg:text-left">
                    <h2 className="font-bricolage text-4xl lg:text-6xl text-white uppercase tracking-wider mb-6 font-medium">
                        The Alchemy
                    </h2>
                    <p className="font-manrope text-white/50 max-w-2xl text-[15px] font-light leading-loose tracking-wide">
                        A precise curation of the world’s rarest raw materials, meticulously blended to forge an uncompromising signature.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-24">
                    {ingredients.map((item, i) => {
                        const Icon = item.icon;
                        return (
                            <div key={i} className="group cursor-default">
                                <div className="mb-8 w-16 h-16 rounded-full border border-white/20 flex items-center justify-center transition-all duration-700 group-hover:bg-white group-hover:text-black text-white group-hover:rotate-45 group-hover:scale-110">
                                    <Icon className="w-8 h-8" />
                                </div>
                                <h3 className="font-bricolage text-2xl text-white tracking-widest mb-4 font-normal uppercase">
                                    {item.title}
                                </h3>
                                <p className="font-manrope text-white/50 font-light leading-loose text-sm tracking-wide">
                                    {item.description}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
