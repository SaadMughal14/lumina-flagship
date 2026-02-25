"use client";

export default function FloatingPill() {
    return (
        <a
            href="https://saadmughal.space"
            target="_blank"
            rel="noopener noreferrer"
            id="floating-pill"
            className="group fixed bottom-6 right-6 lg:bottom-10 lg:right-10 z-[100] bg-white/5 backdrop-blur-md border border-white/10 text-white font-degular tracking-widest uppercase flex items-center justify-end rounded-full overflow-hidden w-12 h-12 hover:bg-white/10 transition-all duration-500 ease-out"
            onMouseEnter={(e) => {
                const el = e.currentTarget;
                if (!el.dataset.gsapExpanded) {
                    el.style.width = "220px";
                    const text = el.querySelector("#floating-pill-text") as HTMLElement;
                    if (text) { text.style.opacity = "1"; text.style.transform = "translateX(0)"; }
                }
            }}
            onMouseLeave={(e) => {
                const el = e.currentTarget;
                if (!el.dataset.gsapExpanded) {
                    el.style.width = "48px";
                    const text = el.querySelector("#floating-pill-text") as HTMLElement;
                    if (text) { text.style.opacity = "0"; text.style.transform = "translateX(16px)"; }
                }
            }}
        >
            <span id="floating-pill-text" className="text-[9px] opacity-0 whitespace-nowrap absolute right-14 translate-x-4 transition-all duration-500 ease-out">
                Want a site like this?
            </span>
            <div className="w-8 h-8 rounded-full bg-white text-black flex flex-shrink-0 items-center justify-center mr-2">
                <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M1 11L11 1M11 1H3M11 1V9" />
                </svg>
            </div>
        </a>
    );
}
