'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Briefcase,
  FileText,
  Leaf,
  ChevronRight,
  LogOut,
} from 'lucide-react';

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/internships', label: 'Internships', icon: Briefcase },
  { href: '/admin/applications', label: 'Applications', icon: FileText },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-60 shrink-0 bg-[#123B2A] text-white min-h-screen flex flex-col">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-white/10">
        <Link href="/" className="flex items-center gap-2.5 font-bold text-white text-base">
          <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#16865B]">
            <Leaf size={17} />
          </span>
          DaunHijau
        </Link>
        <p className="text-[11px] text-white/50 mt-1 ml-10">Admin Dashboard</p>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group ${
                isActive
                  ? 'bg-[#16865B] text-white shadow-sm'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
            >
              <Icon size={17} />
              {label}
              {isActive && (
                <ChevronRight size={14} className="ml-auto opacity-70" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="px-3 py-4 border-t border-white/10">
        <Link
          href="/"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-white/70 hover:text-white hover:bg-white/10 transition-all"
        >
          <LogOut size={16} />
          Back to Portal
        </Link>
      </div>
    </aside>
  );
}
