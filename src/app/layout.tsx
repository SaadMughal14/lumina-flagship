import type { Metadata } from "next";
import { Bricolage_Grotesque, Great_Vibes, Space_Grotesk, Style_Script } from "next/font/google";
import "./globals.css";
import FloatingPill from "@/components/FloatingPill";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
});

const cursive = Great_Vibes({
  weight: "400",
  variable: "--font-cursive",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const styleScript = Style_Script({
  weight: "400",
  variable: "--font-style-script",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LUMINA | Saad Mughal",
  description: "An ultra-luxury fragrance experience.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              document.addEventListener('keydown', event => {
                if (
                  event.key === 'F12' || 
                  (event.ctrlKey && event.shiftKey && event.key === 'I') || 
                  (event.ctrlKey && event.shiftKey && event.key === 'J') || 
                  (event.ctrlKey && event.key === 'U') ||
                  (event.metaKey && event.altKey && event.key === 'I') ||
                  (event.metaKey && event.altKey && event.key === 'J') ||
                  (event.metaKey && event.key === 'U')
                ) {
                  event.preventDefault();
                }
              });
            `,
          }}
        />
      </head>
      <body
        className={`${bricolage.variable} ${cursive.variable} ${spaceGrotesk.variable} ${styleScript.variable} font-degular antialiased selection:bg-white/20 selection:text-white`}
      >
        <FloatingPill />
        {children}
      </body>
    </html>
  );
}
