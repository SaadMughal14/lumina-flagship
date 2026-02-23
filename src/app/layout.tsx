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
          className="fixed bottom-6 right-6 lg:bottom-10 lg:right-10 z-[100] bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/10 text-white font-degular tracking-widest uppercase flex items-center justify-end rounded-full transition-all duration-500 overflow-hidden group w-12 hover:w-48 h-12"
        >
          <span className="text-[10px] sm:text-xs opacity-0 group-hover:opacity-60 transition-all duration-500 whitespace-nowrap absolute right-14 translate-x-4 group-hover:translate-x-0">
            Want a site like this?
          </span>
          <div className="w-10 h-10 rounded-full bg-white text-black flex flex-shrink-0 items-center justify-center transform group-hover:rotate-45 transition-transform duration-500 mr-1">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M1 11L11 1M11 1H3M11 1V9" />
            </svg>
          </div>
        </a>
        {children}
      </body>
    </html>
  );
}
