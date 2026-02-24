import CanvasScrollytelling from "../components/CanvasScrollytelling";
import IngredientsGrid from "../components/IngredientsGrid";
import FAQ from "../components/FAQ";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0B0C10] selection:bg-white/20 selection:text-white">
      <header className="fixed top-0 left-0 w-full p-6 lg:p-10 flex justify-between items-center z-[100] mix-blend-difference pointer-events-none">
        <div className="flex items-center gap-4">
          <svg className="w-8 h-8 text-white relative flex-shrink-0" viewBox="0 0 100 100" fill="currentColor">
            <path d="M20,85 C25,40 45,15 85,15 C60,25 35,50 20,85 Z" />
            <path d="M25,88 C30,45 55,20 90,25 C65,35 40,60 25,88 Z" />
            <path d="M30,91 C40,50 65,30 95,40 C70,50 45,70 30,91 Z" />
            <path d="M35,94 C50,55 75,45 95,60 C75,65 50,80 35,94 Z" />
            <path d="M40,97 C60,65 85,60 85,80 C70,75 55,85 40,97 Z" />
            <path d="M15,80 C15,35 30,10 75,10 C50,15 25,40 15,80 Z" />
          </svg>
          <span className="font-space-grotesk font-extrabold text-xl lg:text-2xl tracking-[0.2em] text-white uppercase" style={{ fontFamily: "var(--font-space-grotesk)" }}>Lumina</span>
        </div>
      </header>

      <CanvasScrollytelling />
      <IngredientsGrid />
      <FAQ />
      <Footer />
    </main>
  );
}
