import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { Search } from "lucide-react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <nav className="bg-red-600 text-white shadow-lg">
          <header className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
            <nav className="flex items-center gap-8">
              <Link href="/" className="text-xl font-bold">PokéApp</Link>
              <Link href="/pokemon" className="hover:text-red-200">Pokédex</Link>
              <Link href="/team" className="hover:text-red-200">Équipes</Link>
              <Link href="/moves" className="hover:text-red-200">Attaques</Link>
            </nav>

            <div className="flex items-center gap-4 relative">
              <input
                type="search"
                placeholder="Rechercher..."
                className="py-1 px-4 pr-10 rounded-full text-gray-900 text-sm focus:ring-2 focus:ring-red-400 focus:outline-none"
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            </div>
          </header>
        </nav>

        <main className="max-w-7xl mx-auto px-4 py-8">
          {children}
        </main>

        <footer className="bg-gray-800 text-white mt-auto">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="text-center">
              <p>Créé avec PokeAPI - 2025</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
