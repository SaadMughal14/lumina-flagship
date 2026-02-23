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
                <h1 className="font-bricolage text-[15vw] lg:text-[18vw] leading-none text-white uppercase tracking-tight opacity-90 select-none font-bold">
                    Lumina
                </h1>
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
