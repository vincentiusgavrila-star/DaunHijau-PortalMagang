'use client';

import Link from 'next/link';
import { Leaf, Mail, MapPin, Phone, Globe, ExternalLink, Share2 } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#123B2A] text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 font-bold text-white text-xl mb-4">
              <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-[#16865B]">
                <Leaf size={20} />
              </span>
              DaunHijau
            </Link>
            <p className="text-sm text-white/70 leading-relaxed max-w-sm mb-5">
              DaunHijau adalah perusahaan teknologi yang bergerak di bidang solusi lingkungan dan
              keberlanjutan. Kami percaya bahwa inovasi teknologi adalah kunci untuk menciptakan masa
              depan yang lebih hijau dan berkelanjutan.
            </p>
            <div className="flex gap-3">
              <a
                  href="#"
                  className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                  aria-label="LinkedIn"
                >
                  <Globe size={16} />
                </a>
                <a
                  href="#"
                  className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                  aria-label="Twitter"
                >
                  <Share2 size={16} />
                </a>
                <a
                  href="#"
                  className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                  aria-label="Instagram"
                >
                  <ExternalLink size={16} />
                </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-white/90 mb-4 uppercase tracking-wider">
              Navigasi
            </h3>
            <ul className="space-y-2.5">
              {[
                { href: '/', label: 'Beranda' },
                { href: '/opportunities', label: 'Lowongan Magang' },
                { href: '/#about', label: 'Tentang Kami' },
                { href: '/#benefits', label: 'Keuntungan' },
                { href: '/admin', label: 'Admin Dashboard' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 hover:text-[#B5E853] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-white/90 mb-4 uppercase tracking-wider">
              Kontak
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5 text-sm text-white/70">
                <MapPin size={15} className="mt-0.5 shrink-0 text-[#B5E853]" />
                Jl. Sudirman No. 123, Jakarta Pusat, DKI Jakarta 10220
              </li>
              <li className="flex items-center gap-2.5 text-sm text-white/70">
                <Mail size={15} className="shrink-0 text-[#B5E853]" />
                internship@daunhijau.co.id
              </li>
              <li className="flex items-center gap-2.5 text-sm text-white/70">
                <Phone size={15} className="shrink-0 text-[#B5E853]" />
                +62 21 1234 5678
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-3 text-sm text-white/50">
          <p>© 2026 DaunHijau. All rights reserved.</p>
          <p>Platform Magang Profesional Indonesia</p>
        </div>
      </div>
    </footer>
  );
}
