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
          className="fixed bottom-10 right-6 lg:right-10 z-[100] font-degular text-[10px] tracking-[0.2em] text-white uppercase mix-blend-difference group flex items-center justify-center gap-2"
          style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
        >
          <span className="opacity-50 group-hover:opacity-100 transition-opacity">saadmughal.space</span>
          <div className="w-[1px] h-0 bg-white group-hover:h-8 transition-all duration-500 ease-out"></div>
        </a>
        {children}
      </body>
    </html>
  );
}
