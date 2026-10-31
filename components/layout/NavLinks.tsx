'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

const navLinks = [
  { href: '/#about', label: 'Tentang Kami' },
  { href: '/#benefits', label: 'Keuntungan' },
  { href: '/#process', label: 'Proses Rekrutmen' },
];

function scrollToSection(href: string) {
  if (href.startsWith('/#')) {
    const id = href.slice(2);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return true;
    }
  }
  return false;
}

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <>
      {navLinks.map((link) => (
        <li key={link.href}>
          <Link
            href={link.href}
            onClick={(e) => {
              if (pathname === '/' && scrollToSection(link.href)) {
                e.preventDefault();
              }
            }}
            className="px-4 py-2 rounded-lg text-sm font-medium transition-colors text-[#738078] hover:text-[#123B2A] hover:bg-gray-50"
          >
            {link.label}
          </Link>
        </li>
      ))}
    </>
  );
}

export function MobileNavLinks({ onClose }: { onClose: () => void }) {
  const pathname = usePathname();

  return (
    <>
      {navLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          onClick={(e) => {
            if (pathname === '/' && scrollToSection(link.href)) {
              e.preventDefault();
            }
            onClose();
          }}
          className="px-4 py-2.5 rounded-lg text-sm font-medium transition-colors text-[#738078] hover:text-[#123B2A]"
        >
          {link.label}
        </Link>
      ))}
    </>
  );
}
