import CanvasScrollytelling from "../components/CanvasScrollytelling";
import IngredientsGrid from "../components/IngredientsGrid";
import FAQ from "../components/FAQ";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0B0C10] selection:bg-white/20 selection:text-white">
      {/* Fixed Brand Header */}
      <header className="fixed top-0 left-0 w-full p-6 lg:p-10 flex justify-between items-center z-[100] mix-blend-difference pointer-events-none">
        <div className="flex items-center gap-4">
          <svg className="w-8 h-8 text-white" viewBox="0 0 100 100" fill="none">
            <path d="M50 5 L95 25 L95 75 L50 95 L5 75 L5 25 Z" stroke="currentColor" strokeWidth="2" />
            <path d="M50 5 L50 45 L95 25" stroke="currentColor" strokeWidth="2" />
            <path d="M50 45 L5 25" stroke="currentColor" strokeWidth="2" />
            <path d="M50 45 L50 95" stroke="currentColor" strokeWidth="2" />
            <circle cx="50" cy="45" r="5" fill="currentColor" />
          </svg>
          <span className="font-bricolage text-xl tracking-widest text-white uppercase font-bold">Lumina</span>
        </div>
      </header>

      <CanvasScrollytelling />
      <IngredientsGrid />
      <FAQ />
      <Footer />
    </main>
  );
}
