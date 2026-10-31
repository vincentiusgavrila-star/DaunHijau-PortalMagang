'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import {
  ArrowRight,
  Leaf,
  Users,
  Briefcase,
  Globe,
  Award,
  CheckCircle,
  Search,
  FileText,
  UserCheck,
  Rocket,
  TreePine,
  Cpu,
  BarChart3,
  ChevronDown,
} from 'lucide-react';
import Button from '@/components/ui/Button';
import InternshipCard from '@/components/public/InternshipCard';
import { getInternships } from '@/lib/storage';
import { Internship } from '@/types';

const stats = [
  { value: '50+', label: 'Alumni Magang', icon: Users },
  { value: '12+', label: 'Program Tersedia', icon: Briefcase },
  { value: '8+', label: 'Departemen', icon: Globe },
  { value: '95%', label: 'Tingkat Kepuasan', icon: Award },
];

const benefits = [
  {
    icon: Briefcase,
    title: 'Pengalaman Kerja Nyata',
    desc: 'Terlibat langsung dalam proyek nyata yang berdampak pada industri lingkungan dan teknologi.',
  },
  {
    icon: Users,
    title: 'Mentorship Profesional',
    desc: 'Dibimbing oleh para profesional berpengalaman di bidangnya masing-masing.',
  },
  {
    icon: Award,
    title: 'Sertifikat Resmi',
    desc: 'Dapatkan sertifikat resmi dari DaunHijau yang diakui oleh industri.',
  },
  {
    icon: Globe,
    title: 'Jaringan Profesional',
    desc: 'Bangun koneksi dengan para profesional dan alumni DaunHijau dari seluruh Indonesia.',
  },
  {
    icon: Cpu,
    title: 'Teknologi Terkini',
    desc: 'Bekerja dengan tech stack dan tools terbaru dalam ekosistem digital modern.',
  },
  {
    icon: BarChart3,
    title: 'Tunjangan Magang',
    desc: 'Dapatkan tunjangan kompetitif selama masa magang untuk mendukung produktivitasmu.',
  },
];

const steps = [
  {
    step: '01',
    icon: Search,
    title: 'Temukan Program',
    desc: 'Jelajahi berbagai program magang yang tersedia dan temukan yang paling sesuai dengan passion dan keahlianmu.',
  },
  {
    step: '02',
    icon: FileText,
    title: 'Kirim Lamaran',
    desc: 'Lengkapi formulir pendaftaran dengan informasi dan motivasimu untuk bergabung bersama DaunHijau.',
  },
  {
    step: '03',
    icon: UserCheck,
    title: 'Proses Seleksi',
    desc: 'Tim kami akan meninjau lamaranmu dan menghubungimu untuk tahap seleksi berikutnya.',
  },
  {
    step: '04',
    icon: Rocket,
    title: 'Mulai Magang',
    desc: 'Selamat! Kamu resmi bergabung sebagai intern DaunHijau dan memulai perjalanan karirmu.',
  },
];

// Hook: returns true once the element enters the viewport
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, visible };
}

// Animated section wrapper
function AnimatedSection({
  children,
  className = '',
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const { ref, visible } = useInView();
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      } ${className}`}
    >
      {children}
    </div>
  );
}

/* ─────────────────────────────────────────────────────
   3D Hero Scene — pure inline SVG, no external deps
───────────────────────────────────────────────────── */
function HeroScene() {
  return (
    <div className="relative w-[480px] h-[480px] select-none">

      {/* ── Outer glowing ring ── */}
      <div className="absolute inset-0 rounded-full border border-[#B5E853]/15 animate-[spin_30s_linear_infinite]" />
      <div className="absolute inset-8 rounded-full border border-white/5 animate-[spin_20s_linear_infinite_reverse]" />

      {/* ── Central 3D globe / Earth-like sphere ── */}
      <div className="absolute inset-0 flex items-center justify-center">
        <svg width="260" height="260" viewBox="0 0 260 260" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-2xl animate-[float_6s_ease-in-out_infinite]">
          <defs>
            <radialGradient id="sphereGrad" cx="38%" cy="35%" r="60%">
              <stop offset="0%" stopColor="#2ecc71" />
              <stop offset="40%" stopColor="#16865B" />
              <stop offset="100%" stopColor="#0a2419" />
            </radialGradient>
            <radialGradient id="sphereShine" cx="35%" cy="30%" r="40%">
              <stop offset="0%" stopColor="white" stopOpacity="0.18" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="sphereShadow" cx="50%" cy="50%" r="50%">
              <stop offset="60%" stopColor="transparent" />
              <stop offset="100%" stopColor="#000" stopOpacity="0.5" />
            </radialGradient>
            <clipPath id="sphereClip">
              <circle cx="130" cy="130" r="118" />
            </clipPath>
            <filter id="glow">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>

          {/* Base sphere */}
          <circle cx="130" cy="130" r="118" fill="url(#sphereGrad)" />

          {/* Continent-like shapes */}
          <g clipPath="url(#sphereClip)" opacity="0.85">
            {/* Africa / Europe blob */}
            <ellipse cx="118" cy="105" rx="28" ry="38" fill="#B5E853" opacity="0.55" transform="rotate(-15 118 105)" />
            <ellipse cx="130" cy="155" rx="22" ry="30" fill="#B5E853" opacity="0.45" transform="rotate(10 130 155)" />
            {/* Americas */}
            <ellipse cx="78" cy="120" rx="16" ry="32" fill="#B5E853" opacity="0.4" transform="rotate(-20 78 120)" />
            <ellipse cx="70" cy="158" rx="12" ry="20" fill="#B5E853" opacity="0.35" transform="rotate(5 70 158)" />
            {/* Asia */}
            <ellipse cx="170" cy="100" rx="32" ry="22" fill="#B5E853" opacity="0.5" transform="rotate(20 170 100)" />
            <ellipse cx="185" cy="130" rx="18" ry="15" fill="#B5E853" opacity="0.38" />
            {/* Australia */}
            <ellipse cx="175" cy="168" rx="14" ry="10" fill="#B5E853" opacity="0.45" transform="rotate(10 175 168)" />
            {/* Grid lines */}
            <line x1="12" y1="130" x2="248" y2="130" stroke="white" strokeOpacity="0.07" strokeWidth="1" />
            <line x1="130" y1="12" x2="130" y2="248" stroke="white" strokeOpacity="0.07" strokeWidth="1" />
            <ellipse cx="130" cy="130" rx="118" ry="48" stroke="white" strokeOpacity="0.07" strokeWidth="1" fill="none" />
            <ellipse cx="130" cy="130" rx="118" ry="88" stroke="white" strokeOpacity="0.05" strokeWidth="1" fill="none" />
          </g>

          {/* Shine overlay */}
          <circle cx="130" cy="130" r="118" fill="url(#sphereShine)" />
          {/* Edge shadow */}
          <circle cx="130" cy="130" r="118" fill="url(#sphereShadow)" />
          {/* Specular highlight */}
          <ellipse cx="95" cy="82" rx="22" ry="14" fill="white" opacity="0.12" transform="rotate(-30 95 82)" />
        </svg>
      </div>

      {/* ── Orbit ring with dot ── */}
      <div className="absolute inset-4 rounded-full border border-[#B5E853]/20 animate-[spin_12s_linear_infinite]">
        <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[#B5E853] shadow-[0_0_10px_#B5E853]" />
      </div>
      <div className="absolute inset-16 rounded-full border border-white/10 animate-[spin_18s_linear_infinite_reverse]">
        <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-white/60" />
      </div>

      {/* ── Floating 3D cards ── */}
      {/* Card 1 — Top-right: role badge */}
      <div className="absolute -top-2 right-0 animate-[floatSlow_7s_ease-in-out_infinite]">
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-4 py-3 shadow-xl flex items-center gap-3 min-w-[160px]">
          <div className="w-9 h-9 rounded-xl bg-[#B5E853]/20 flex items-center justify-center shrink-0">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#B5E853" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
            </svg>
          </div>
          <div>
            <p className="text-[10px] text-white/50 leading-none mb-0.5">Posisi Tersedia</p>
            <p className="text-sm font-bold text-white leading-none">12 Program</p>
          </div>
        </div>
      </div>

      {/* Card 2 — Bottom-left: applicants */}
      <div className="absolute bottom-4 -left-4 animate-[floatSlow_9s_1s_ease-in-out_infinite]">
        <div className="bg-[#16865B]/80 backdrop-blur-md border border-[#B5E853]/30 rounded-2xl px-4 py-3 shadow-xl flex items-center gap-3 min-w-[155px]">
          <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#B5E853" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
          </div>
          <div>
            <p className="text-[10px] text-white/60 leading-none mb-0.5">Total Pendaftar</p>
            <p className="text-sm font-bold text-white leading-none">50+ Alumni</p>
          </div>
        </div>
      </div>

      {/* Card 3 — Mid-right: rating */}
      <div className="absolute top-1/2 -right-6 -translate-y-1/2 animate-[floatSlow_8s_2s_ease-in-out_infinite]">
        <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl px-4 py-3 shadow-xl">
          <p className="text-[10px] text-white/50 mb-1.5">Kepuasan Intern</p>
          <div className="flex items-center gap-1.5">
            {[1,2,3,4,5].map(i => (
              <svg key={i} width="12" height="12" viewBox="0 0 24 24" fill={i < 5 ? '#B5E853' : 'none'} stroke="#B5E853" strokeWidth="2">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
              </svg>
            ))}
          </div>
          <p className="text-sm font-bold text-white mt-1">4.9 / 5.0</p>
        </div>
      </div>

      {/* ── Floating particles / dots ── */}
      <div className="absolute top-10 left-10 w-2.5 h-2.5 rounded-full bg-[#B5E853]/70 animate-[floatSlow_5s_ease-in-out_infinite] shadow-[0_0_8px_#B5E853]" />
      <div className="absolute bottom-16 right-10 w-2 h-2 rounded-full bg-white/40 animate-[floatSlow_7s_1.5s_ease-in-out_infinite]" />
      <div className="absolute top-1/3 left-6 w-1.5 h-1.5 rounded-full bg-[#B5E853]/50 animate-[floatSlow_6s_0.8s_ease-in-out_infinite]" />
      <div className="absolute bottom-28 left-1/4 w-2 h-2 rounded-full bg-white/30 animate-[floatSlow_8s_2s_ease-in-out_infinite]" />
    </div>
  );
}

function ScrollDownIndicator() {
  return (
    <button
      onClick={() => {
        const el = document.getElementById('featured');
        el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }}
      className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/50 hover:text-white/80 transition-colors group"
      aria-label="Scroll down"
    >
      <span className="text-xs tracking-widest uppercase font-medium">Scroll</span>
      <ChevronDown size={20} className="animate-bounce" />
    </button>
  );
}

export default function HomePage() {
  const [openInternships, setOpenInternships] = useState<Internship[]>([]);

  useEffect(() => {
    const all = getInternships();
    setOpenInternships(all.filter((i) => i.status === 'Open').slice(0, 3));
  }, []);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0d2b1e] via-[#123B2A] to-[#0d2b1e] text-white min-h-[96vh] flex items-center">
        {/* ── Background layer ── */}
        {/* Dot-grid pattern */}
        <div className="absolute inset-0 opacity-[0.07]"
          style={{ backgroundImage: 'radial-gradient(circle, #B5E853 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
        {/* Large radial glow centre */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_70%_at_60%_50%,_rgba(22,134,91,0.35)_0%,_transparent_70%)]" />
        {/* Top-right lime blob */}
        <div className="absolute -top-32 -right-32 w-[520px] h-[520px] bg-[#B5E853]/10 rounded-full blur-3xl" />
        {/* Bottom-left dark blob */}
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#16865B]/20 rounded-full blur-3xl" />

        <div className="relative w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* ── Left: Text content ── */}
            <div className="text-left">
              <div
                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 text-sm mb-6
                  animate-[fadeInDown_0.6s_ease_both]"
              >
                <Leaf size={14} className="text-[#B5E853]" />
                Program Magang Resmi DaunHijau 2026
              </div>

              <h1
                className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.12] mb-6
                  animate-[fadeInUp_0.7s_0.1s_ease_both]"
              >
                Wujudkan Karir Impian di{' '}
                <span className="text-[#B5E853]">Era Teknologi Hijau</span>
              </h1>

              <p
                className="text-lg text-white/75 max-w-lg mb-10 leading-relaxed
                  animate-[fadeInUp_0.7s_0.2s_ease_both]"
              >
                Bergabunglah dengan program magang DaunHijau dan dapatkan pengalaman nyata di persimpangan
                teknologi modern dan kepedulian lingkungan hidup.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 animate-[fadeInUp_0.7s_0.3s_ease_both]">
                <Link href="/opportunities">
                  <Button variant="secondary" size="lg" className="group">
                    Explore Opportunities
                    <ArrowRight size={18} className="group-hover:translate-x-0.5 transition-transform" />
                  </Button>
                </Link>
                <button
                  onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 text-base rounded-xl font-medium bg-white/10 text-white hover:bg-white/20 border border-white/20 transition-all duration-200"
                >
                  Pelajari Lebih Lanjut
                </button>
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 mt-14 animate-[fadeInUp_0.7s_0.4s_ease_both]">
                {stats.map(({ value, label, icon: Icon }) => (
                  <div key={label} className="flex flex-col gap-1">
                    <div className="flex items-center gap-1.5">
                      <Icon size={15} className="text-[#B5E853]" />
                      <span className="text-2xl font-bold">{value}</span>
                    </div>
                    <span className="text-xs text-white/55">{label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Right: 3D SVG Scene ── */}
            <div className="hidden lg:flex items-center justify-center relative animate-[fadeInUp_0.9s_0.35s_ease_both]">
              <HeroScene />
            </div>
          </div>
        </div>

        <ScrollDownIndicator />
      </section>

      {/* Featured Internships */}
      <section id="featured" className="py-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-[#17231D]">Lowongan Terbuka</h2>
              <p className="text-[#738078] text-sm mt-1">Program magang yang sedang aktif menerima pendaftar</p>
            </div>
            <Link href="/opportunities">
              <Button variant="outline" size="sm" className="hidden sm:flex group">
                Lihat Semua
                <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
              </Button>
            </Link>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {openInternships.map((internship, i) => (
            <AnimatedSection key={internship.id} delay={i * 100}>
              <InternshipCard internship={internship} />
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection className="text-center mt-8 sm:hidden">
          <Link href="/opportunities">
            <Button variant="outline">
              Lihat Semua Lowongan
              <ArrowRight size={16} />
            </Button>
          </Link>
        </AnimatedSection>
      </section>

      {/* About */}
      <section id="about" className="bg-[#123B2A] text-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <AnimatedSection>
              <div className="inline-flex items-center gap-2 bg-[#B5E853]/20 text-[#B5E853] rounded-full px-4 py-1.5 text-sm font-medium mb-5">
                <TreePine size={14} />
                Tentang DaunHijau
              </div>
              <h2 className="text-3xl font-bold mb-5 leading-snug">
                Inovasi Teknologi untuk Masa Depan yang Lebih Hijau
              </h2>
              <p className="text-white/75 leading-relaxed mb-4">
                DaunHijau adalah perusahaan teknologi terdepan yang berfokus pada pengembangan solusi
                digital untuk tantangan lingkungan. Kami menggabungkan kekuatan inovasi teknologi dengan
                komitmen kuat terhadap keberlanjutan lingkungan hidup.
              </p>
              <p className="text-white/75 leading-relaxed mb-6">
                Sejak berdiri tahun 2018, DaunHijau telah memimpin gerakan eco-tech di Indonesia dengan
                produk dan layanan yang membantu ribuan perusahaan dan individu menjalani gaya hidup lebih
                ramah lingkungan.
              </p>
              <ul className="space-y-3">
                {[
                  'Lebih dari 200+ karyawan aktif',
                  'Beroperasi di 5 kota besar Indonesia',
                  'Mitra dengan 50+ perusahaan Fortune 500',
                  'Penghargaan Top GreenTech Company 2024',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-sm text-white/80">
                    <CheckCircle size={15} className="text-[#B5E853] shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </AnimatedSection>

            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Cpu, title: 'Tech-Driven', desc: 'Solusi berbasis teknologi mutakhir' },
                { icon: Leaf, title: 'Eco-Friendly', desc: 'Komitmen lingkungan di setiap inovasi' },
                { icon: Users, title: 'Community', desc: 'Membangun ekosistem green tech' },
                { icon: Globe, title: 'Impact', desc: 'Dampak nyata bagi Indonesia' },
              ].map(({ icon: Icon, title, desc }, i) => (
                <AnimatedSection key={title} delay={i * 80}>
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/10 hover:bg-white/15 transition-colors h-full">
                    <div className="p-2 rounded-lg bg-[#B5E853]/20 inline-flex mb-3">
                      <Icon size={18} className="text-[#B5E853]" />
                    </div>
                    <h4 className="font-semibold text-sm mb-1">{title}</h4>
                    <p className="text-xs text-white/60">{desc}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section id="benefits" className="py-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-[#17231D] mb-2">
            Kenapa Magang di DaunHijau?
          </h2>
          <p className="text-[#738078] max-w-xl mx-auto text-sm">
            Kami menawarkan lebih dari sekadar pengalaman kerja — kami membangun fondasi karir yang kuat
            untuk generasi pemimpin masa depan.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {benefits.map(({ icon: Icon, title, desc }, i) => (
            <AnimatedSection key={title} delay={i * 80}>
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 hover:shadow-md hover:-translate-y-0.5 transition-all h-full">
                <div className="p-2.5 rounded-xl bg-[#F7F9F5] inline-flex mb-4">
                  <Icon size={22} className="text-[#16865B]" />
                </div>
                <h3 className="font-semibold text-[#17231D] mb-2">{title}</h3>
                <p className="text-sm text-[#738078] leading-relaxed">{desc}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* Process */}
      <section id="process" className="bg-[#F7F9F5] py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-[#17231D] mb-2">
              Proses Rekrutmen
            </h2>
            <p className="text-[#738078] text-sm">
              Proses seleksi yang transparan, adil, dan efisien untuk semua calon intern.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map(({ step, icon: Icon, title, desc }, i) => (
              <AnimatedSection key={step} delay={i * 120}>
                <div className="relative text-center">
                  <div className="flex flex-col items-center">
                    <div className="w-14 h-14 rounded-2xl bg-[#123B2A] text-white flex items-center justify-center mb-4 shadow-lg">
                      <Icon size={22} />
                    </div>
                    <span className="text-xs font-bold text-[#B5E853] bg-[#16865B]/10 rounded-full px-2.5 py-0.5 mb-3">
                      Step {step}
                    </span>
                    <h3 className="font-semibold text-[#17231D] mb-2">{title}</h3>
                    <p className="text-sm text-[#738078] leading-relaxed">{desc}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="bg-gradient-to-r from-[#123B2A] to-[#16865B] rounded-3xl p-10 text-white text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#B5E853]/10 rounded-full blur-3xl" />
            <div className="relative">
              <Leaf size={32} className="mx-auto mb-4 text-[#B5E853]" />
              <h2 className="text-2xl md:text-3xl font-bold mb-3">
                Siap Memulai Perjalananmu?
              </h2>
              <p className="text-white/80 mb-7 max-w-lg mx-auto text-sm">
                Daftarkan dirimu sekarang dan jadilah bagian dari komunitas intern DaunHijau yang
                berdedikasi untuk menciptakan masa depan lebih baik.
              </p>
              <Link href="/opportunities">
                <Button variant="secondary" size="lg" className="group">
                  Lihat Lowongan Magang
                  <ArrowRight size={18} className="group-hover:translate-x-0.5 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </AnimatedSection>
      </section>

      {/* Keyframe styles */}
      <style>{`
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-14px); }
        }
        @keyframes floatSlow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33%       { transform: translateY(-8px) rotate(1deg); }
          66%       { transform: translateY(4px) rotate(-1deg); }
        }
        [style*="animation"] { animation-fill-mode: both; }
      `}</style>
    </>
  );
}
