import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Physics with Ankit | Master the Universe",
  description: "Learn physics with Ankit Yadav. Interactive, dynamic, and fun learning platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-slate-950 text-slate-50 min-h-screen flex flex-col selection:bg-blue-500/30`}>
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
