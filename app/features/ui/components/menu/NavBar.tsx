'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { label: 'Accueil', href: '/' },
  { label: 'Pokédex', href: '/pokedex' },
  { label: 'Attaques', href: '/attacks' },
  { label: 'Objets', href: '/items' },
  { label: 'Équipe', href: '/team' },
];

const NavMenu = () => {
  const pathname = usePathname();

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-white/30 backdrop-blur-xl border border-white/20 shadow-lg rounded-full px-6 py-2 flex gap-4 items-center text-sm text-gray-700">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={clsx(
            'px-3 py-1 rounded-full font-medium transition-colors hover:bg-white/50',
            {
              'bg-white text-black shadow': pathname === item.href,
            }
          )}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}

export default NavMenu;