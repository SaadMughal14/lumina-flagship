import CanvasScrollytelling from "../components/CanvasScrollytelling";
import IngredientsGrid from "../components/IngredientsGrid";
import FAQ from "../components/FAQ";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0B0C10] selection:bg-white/20 selection:text-white">
      <header id="global-header" className="fixed top-0 left-0 w-full z-[100] transition-all duration-500 pointer-events-none">
        <div id="navbar-bg" className="absolute inset-0 bg-[#0B0C10] border-b border-white/10 opacity-0 transition-opacity duration-500 pointer-events-auto"></div>
        <div className="relative flex justify-between items-center p-3 pt-4 lg:px-4 lg:py-3 left-0">
          <div className="flex items-center gap-0.5 mix-blend-difference pointer-events-auto cursor-pointer opacity-40 lg:opacity-100 scale-90 lg:scale-100 origin-top-left">
            <img
              src="/assets/new-logo.png"
              alt="Lumina Icon"
              className="w-8 h-8 lg:w-9 lg:h-9 object-contain brightness-0 invert"
            />
            <span className="font-style-script font-normal text-3xl lg:text-4xl text-white capitalize leading-none tracking-wide pt-1" style={{ fontFamily: "var(--font-style-script)" }}>Lumina</span>
          </div>
        </div>
      </header>

      <CanvasScrollytelling />
      <IngredientsGrid />
      <FAQ />
      <Footer />
    </main>
  );
}
