'use client';

import Link from 'next/link';
import { Suspense, useState } from 'react';
import { Menu, X, Leaf } from 'lucide-react';
import Button from '@/components/ui/Button';
import NavLinks, { MobileNavLinks } from './NavLinks';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-[#123B2A] text-lg">
          <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#16865B] text-white">
            <Leaf size={18} />
          </span>
          DaunHijau
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-1">
          <Suspense fallback={null}>
            <NavLinks />
          </Suspense>
        </ul>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link href="/admin">
            <Button variant="outline" size="sm">
              Admin
            </Button>
          </Link>
          <Link href="/opportunities">
            <Button size="sm">Explore Opportunities</Button>
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 rounded-lg text-[#738078] hover:text-[#17231D] hover:bg-gray-100 transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile drawer */}
      {menuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 py-3 flex flex-col gap-2">
          <Suspense fallback={null}>
            <MobileNavLinks onClose={() => setMenuOpen(false)} />
          </Suspense>
          <div className="flex flex-col gap-2 pt-2 border-t border-gray-100 mt-1">
            <Link href="/admin" onClick={() => setMenuOpen(false)}>
              <Button variant="outline" size="sm" className="w-full">
                Admin Dashboard
              </Button>
            </Link>
            <Link href="/opportunities" onClick={() => setMenuOpen(false)}>
              <Button size="sm" className="w-full">
                Explore Opportunities
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
