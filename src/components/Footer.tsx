"use client";

export default function Footer() {
    return (
        <footer className="relative w-full h-[100dvh] bg-[#0B0C10] flex flex-col justify-between items-center z-50 pt-32 pb-16 px-6 lg:px-24">
            {/* Top Section: Newsletter */}
            <div className="w-full max-w-2xl text-center">
                <h2 className="font-bricolage text-3xl lg:text-4xl text-white tracking-widest font-medium mb-8 uppercase">
                    Join the Inner Circle
                </h2>
                <form className="relative flex items-center w-full" onSubmit={(e) => e.preventDefault()}>
                    <input
                        type="email"
                        placeholder="Enter your email address"
                        className="w-full bg-transparent border-b border-white/30 text-white font-degular font-light text-[15px] py-4 px-2 focus:outline-none focus:border-white transition-colors placeholder:text-white/20 tracking-wide"
                        required
                    />
                    <button
                        type="submit"
                        className="absolute right-0 text-white font-degular text-[11px] tracking-[0.2em] uppercase hover:text-white/70 transition-colors"
                    >
                        Submit
                    </button>
                </form>
            </div>

            {/* Bottom Section: Giant Logo & Copyright */}
            <div className="w-full flex flex-col items-center mt-auto">
                <div className="flex flex-col items-center gap-8 opacity-90 mb-10">
                    <svg className="w-24 h-24 lg:w-32 lg:h-32 text-white" viewBox="0 0 100 100" fill="currentColor">
                        <path d="M20,85 C25,40 45,15 85,15 C60,25 35,50 20,85 Z" />
                        <path d="M25,88 C30,45 55,20 90,25 C65,35 40,60 25,88 Z" />
                        <path d="M30,91 C40,50 65,30 95,40 C70,50 45,70 30,91 Z" />
                        <path d="M35,94 C50,55 75,45 95,60 C75,65 50,80 35,94 Z" />
                        <path d="M40,97 C60,65 85,60 85,80 C70,75 55,85 40,97 Z" />
                        <path d="M15,80 C15,35 30,10 75,10 C50,15 25,40 15,80 Z" />
                    </svg>
                    <h1 className="font-space-grotesk text-7xl lg:text-9xl leading-none text-white uppercase tracking-[0.2em] font-extrabold" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                        Lumina
                    </h1>
                </div>
                <div className="flex w-full justify-between items-center text-white/40 font-degular text-[10px] tracking-[0.2em] uppercase mt-8 border-t border-white/10 pt-8 pb-8 lg:pb-12">
                    <span>&copy; {new Date().getFullYear()} Lumina Parfums</span>
                    <div className="flex gap-8 lg:pr-32 pr-28 z-20">
                        <a href="https://instagram.com/batch_systems" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Instagram</a>
                        <a href="#" className="hover:text-white transition-colors">Legal</a>
                        <a href="mailto:isaadimughal@gmail.com" className="hover:text-white transition-colors">Contact</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
