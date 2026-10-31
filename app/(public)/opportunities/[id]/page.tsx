'use client';

import { Suspense, useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  MapPin,
  Clock,
  Calendar,
  Building2,
  CheckCircle,
  ChevronRight,
  Briefcase,
} from 'lucide-react';
import { Internship } from '@/types';
import { getInternshipById } from '@/lib/storage';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

function InternshipDetail() {
  const params = useParams();
  const [internship, setInternship] = useState<Internship | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const id = params?.id as string;
    if (!id) { setNotFound(true); return; }
    const found = getInternshipById(id);
    if (!found) setNotFound(true);
    else setInternship(found);
  }, [params?.id]);

  if (notFound) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <Briefcase size={40} className="mx-auto text-[#738078] mb-4" />
        <h1 className="text-xl font-bold text-[#17231D] mb-2">Lowongan Tidak Ditemukan</h1>
        <p className="text-[#738078] text-sm mb-6">Lowongan yang Anda cari tidak tersedia.</p>
        <Link href="/opportunities">
          <Button>Kembali ke Daftar Lowongan</Button>
        </Link>
      </div>
    );
  }

  if (!internship) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <div className="w-8 h-8 border-2 border-[#16865B] border-t-transparent rounded-full animate-spin mx-auto" />
      </div>
    );
  }

  const isExpired = new Date(internship.deadline) < new Date();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-[#738078] mb-6">
        <Link href="/" className="hover:text-[#16865B] transition-colors">Beranda</Link>
        <ChevronRight size={14} />
        <Link href="/opportunities" className="hover:text-[#16865B] transition-colors">Lowongan</Link>
        <ChevronRight size={14} />
        <span className="text-[#17231D] font-medium truncate max-w-xs">{internship.title}</span>
      </nav>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Header card */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-[#F7F9F5]">
                <Building2 size={24} className="text-[#16865B]" />
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap gap-2 mb-2">
                  <Badge label={internship.status} />
                  <Badge label={internship.workType} />
                </div>
                <h1 className="text-xl font-bold text-[#17231D]">{internship.title}</h1>
                <p className="text-[#738078] text-sm mt-1">{internship.department} · DaunHijau</p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="font-semibold text-[#17231D] mb-3">Deskripsi Pekerjaan</h2>
            <p className="text-sm text-[#738078] leading-relaxed">{internship.description}</p>
          </div>

          {/* Responsibilities */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="font-semibold text-[#17231D] mb-3">Tanggung Jawab</h2>
            <ul className="space-y-2.5">
              {internship.responsibilities.map((r, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-[#738078]">
                  <CheckCircle size={15} className="text-[#16865B] mt-0.5 shrink-0" />
                  {r}
                </li>
              ))}
            </ul>
          </div>

          {/* Requirements */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="font-semibold text-[#17231D] mb-3">Persyaratan</h2>
            <ul className="space-y-2.5">
              {internship.requirements.map((r, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-[#738078]">
                  <CheckCircle size={15} className="text-[#16865B] mt-0.5 shrink-0" />
                  {r}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Quick Info */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <h3 className="font-semibold text-[#17231D] mb-4 text-sm">Informasi Program</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Building2 size={15} className="text-[#16865B] mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-[#738078]">Departemen</p>
                  <p className="text-sm font-medium text-[#17231D]">{internship.department}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin size={15} className="text-[#16865B] mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-[#738078]">Lokasi</p>
                  <p className="text-sm font-medium text-[#17231D]">{internship.location}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock size={15} className="text-[#16865B] mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-[#738078]">Durasi</p>
                  <p className="text-sm font-medium text-[#17231D]">{internship.duration}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Calendar size={15} className={`mt-0.5 shrink-0 ${isExpired ? 'text-red-400' : 'text-[#16865B]'}`} />
                <div>
                  <p className="text-xs text-[#738078]">Deadline</p>
                  <p className={`text-sm font-medium ${isExpired ? 'text-red-500' : 'text-[#17231D]'}`}>
                    {formatDate(internship.deadline)}
                    {isExpired && ' (Expired)'}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-gray-100 space-y-2">
              {internship.status === 'Open' && !isExpired ? (
                <Link href={`/apply/${internship.id}`} className="block">
                  <Button className="w-full" size="lg">
                    Apply Now
                  </Button>
                </Link>
              ) : (
                <Button className="w-full" size="lg" disabled>
                  {isExpired ? 'Deadline Telah Lewat' : 'Pendaftaran Ditutup'}
                </Button>
              )}
              <Link href="/opportunities" className="block">
                <Button variant="ghost" size="sm" className="w-full">
                  <ArrowLeft size={14} />
                  Kembali ke Daftar
                </Button>
              </Link>
            </div>
          </div>

          {/* About Company */}
          <div className="bg-[#123B2A] text-white rounded-2xl p-5">
            <h3 className="font-semibold mb-2 text-sm">Tentang DaunHijau</h3>
            <p className="text-xs text-white/70 leading-relaxed">
              Perusahaan teknologi terdepan di bidang solusi lingkungan dan keberlanjutan. Bergabunglah dan
              jadilah bagian dari misi kami.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function InternshipDetailPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-2 border-[#16865B] border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <InternshipDetail />
    </Suspense>
  );
}
