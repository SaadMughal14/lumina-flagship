import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LUMINA | Digital Flagship",
  description: "An ultra-luxury fragrance experience.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${bricolage.variable} font-degular antialiased selection:bg-white/20 selection:text-white`}
      >
        <a
          href="https://saadmughal.space"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 lg:bottom-10 lg:right-10 z-[100] bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/10 text-white font-degular tracking-widest uppercase flex items-center gap-4 px-6 py-3 rounded-full transition-all duration-500 overflow-hidden group"
        >
          <span className="text-[10px] sm:text-xs opacity-60 group-hover:opacity-100 transition-opacity">Want a site like this?</span>
          <div className="w-6 h-6 rounded-full bg-white text-black flex items-center justify-center transform group-hover:scale-110 transition-transform">
            <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M1 11L11 1M11 1H3M11 1V9" />
            </svg>
          </div>
        </a>
        {children}
      </body>
    </html>
  );
}
