import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Learn with Ankit | Master Physics",
  description: "Learn with Ankit Yadav. Interactive, dynamic, and intuitive physics learning platform.",
  icons: [
    {
      rel: "icon",
      type: "image/png",
      sizes: "any",
      url: "/favicon.png",
    },
    {
      rel: "apple-touch-icon",
      type: "image/png",
      sizes: "180x180",
      url: "/favicon.png",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-[#0a0500] text-slate-50 min-h-screen flex flex-col selection:bg-amber-500/30`}>
        <Navbar />
        <main className="flex-1 relative">
          {/* Subtle starry background effect for the whole site */}
          <div className="fixed inset-0 z-0 opacity-20 pointer-events-none" 
               style={{ backgroundImage: 'radial-gradient(circle at center, #ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
          </div>
          <div className="relative z-10">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
