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
          <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.75">
            <path d="M12 3C12 3 6 11.5 6 16.5C6 19.8137 8.68629 22.5 12 22.5C15.3137 22.5 18 19.8137 18 16.5C18 11.5 12 3 12 3Z" />
            <path d="M12 10V16" strokeDasharray="2 2" />
            <circle cx="12" cy="19" r="0.5" fill="currentColor" />
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
