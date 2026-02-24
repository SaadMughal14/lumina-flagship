import CanvasScrollytelling from "../components/CanvasScrollytelling";
import IngredientsGrid from "../components/IngredientsGrid";
import FAQ from "../components/FAQ";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0B0C10] selection:bg-white/20 selection:text-white">
      <header id="global-header" className="fixed top-0 left-0 p-4 lg:p-6 flex justify-between items-center z-[100] mix-blend-difference pointer-events-none transition-opacity duration-500 opacity-0">
        <div className="flex items-center gap-4">
          <span className="font-style-script font-normal text-4xl lg:text-5xl text-white capitalize leading-none" style={{ fontFamily: "var(--font-style-script)" }}>Lumina</span>
        </div>
      </header>

      <CanvasScrollytelling />
      <IngredientsGrid />
      <FAQ />
      <Footer />
    </main>
  );
}
