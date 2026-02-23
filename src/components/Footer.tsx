"use client";

export default function Footer() {
    return (
        <footer className="relative w-full h-[100dvh] bg-[#0B0C10] flex flex-col justify-between items-center z-50 pt-32 pb-16 px-6 lg:px-24">
            {/* Top Section: Newsletter */}
            <div className="w-full max-w-2xl text-center">
                <h2 className="font-playfair text-3xl lg:text-4xl text-white tracking-wide mb-8">
                    Join the Inner Circle
                </h2>
                <form className="relative flex items-center w-full" onSubmit={(e) => e.preventDefault()}>
                    <input
                        type="email"
                        placeholder="Enter your email address"
                        className="w-full bg-transparent border-b border-white/30 text-white font-inter font-light text-lg py-4 px-2 focus:outline-none focus:border-white transition-colors placeholder:text-white/20"
                        required
                    />
                    <button
                        type="submit"
                        className="absolute right-0 text-white font-inter text-sm tracking-widest uppercase hover:text-white/70 transition-colors"
                    >
                        Submit
                    </button>
                </form>
            </div>

            {/* Bottom Section: Giant Logo & Copyright */}
            <div className="w-full flex flex-col items-center mt-auto">
                <h1 className="font-playfair text-[15vw] lg:text-[18vw] leading-none text-white uppercase tracking-tighter opacity-90 select-none">
                    Lumina
                </h1>
                <div className="flex w-full justify-between items-center text-white/40 font-inter text-xs tracking-widest uppercase mt-8 border-t border-white/10 pt-8">
                    <span>&copy; {new Date().getFullYear()} Lumina Parfums</span>
                    <div className="flex gap-8">
                        <a href="#" className="hover:text-white transition-colors">Instagram</a>
                        <a href="#" className="hover:text-white transition-colors">Legal</a>
                        <a href="#" className="hover:text-white transition-colors">Contact</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
