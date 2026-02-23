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
                    <svg className="w-24 h-24 lg:w-32 lg:h-32 text-white" viewBox="0 0 100 100">
                        <g transform="translate(50, 50)">
                            {Array.from({ length: 12 }).map((_, i) => (
                                <path
                                    key={i}
                                    d="M 0,-8 C -8,-25 -8,-45 0,-45 C 8,-45 8,-25 0,-8 Z"
                                    transform={`rotate(${i * 30})`}
                                    fill="currentColor"
                                />
                            ))}
                        </g>
                    </svg>
                    <h1 className="font-cursive text-7xl lg:text-9xl leading-none text-white capitalize select-none font-normal">
                        Lumina
                    </h1>
                </div>
                <div className="flex w-full justify-between items-center text-white/40 font-degular text-[10px] tracking-[0.2em] uppercase mt-8 border-t border-white/10 pt-8">
                    <span>&copy; {new Date().getFullYear()} Lumina Parfums</span>
                    <div className="flex gap-8">
                        <a href="https://instagram.com/batch_systems" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Instagram</a>
                        <a href="#" className="hover:text-white transition-colors">Legal</a>
                        <a href="mailto:isaadimughal@gmail.com" className="hover:text-white transition-colors">Contact</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
