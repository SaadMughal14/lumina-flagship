import { Droplet, Flame, Moon } from "lucide-react";

const ingredients = [
    {
        title: "Smoked Agarwood",
        description: "Sourced from the deep forests of Assam, aged for unparalleled depth.",
        icon: Flame,
    },
    {
        title: "Ambergris",
        description: "Oceanic warmth that anchors the volatile top notes.",
        icon: Droplet,
    },
    {
        title: "Dark Saffron",
        description: "Hand-harvested crimson threads providing a leathery, spiced aura.",
        icon: Moon,
    },
];

export default function IngredientsGrid() {
    return (
        <section className="relative w-full bg-[#0B0C10] py-32 px-6 lg:px-24 border-t border-white/10 z-50">
            <div className="max-w-7xl mx-auto">
                <div className="mb-20 text-center lg:text-left">
                    <h2 className="font-playfair text-4xl lg:text-6xl text-white uppercase tracking-wider mb-6">
                        The Alchemy
                    </h2>
                    <p className="font-inter text-white/60 max-w-2xl text-lg font-light">
                        A precise curation of the world’s rarest raw materials, meticulously blended to forge an uncompromising signature.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-24">
                    {ingredients.map((item, i) => {
                        const Icon = item.icon;
                        return (
                            <div key={i} className="group cursor-default">
                                <div className="mb-6 w-16 h-16 rounded-full border border-white/20 flex items-center justify-center transition-colors duration-500 group-hover:bg-white group-hover:text-black text-white">
                                    <Icon strokeWidth={1} size={28} />
                                </div>
                                <h3 className="font-playfair text-2xl text-white tracking-wide mb-4">
                                    {item.title}
                                </h3>
                                <p className="font-inter text-white/60 font-light leading-relaxed">
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
