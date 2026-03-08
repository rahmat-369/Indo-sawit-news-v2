import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "IndoSawit.news | Pusat Asupan Kabar Terkini",
  description: "Aggregator berita modern besutan Rahmat (rAi-engine).",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className="antialiased font-sans text-white bg-[#050705]">
        {children}
      </body>
    </html>
  );
                                   }
