'use client';

import { Suspense } from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle, ArrowLeft, ChevronRight } from 'lucide-react';
import { Internship } from '@/types';
import { getInternshipById, createApplication } from '@/lib/storage';
import Button from '@/components/ui/Button';
import { Input, Textarea, Select } from '@/components/ui/FormInputs';

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  university: string;
  major: string;
  semester: string;
  linkedIn: string;
  portfolio: string;
  motivation: string;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  university?: string;
  major?: string;
  semester?: string;
  motivation?: string;
}

const semesterOptions = Array.from({ length: 12 }, (_, i) => ({
  value: String(i + 1),
  label: `Semester ${i + 1}`,
}));

function validateForm(data: FormData): FormErrors {
  const errors: FormErrors = {};
  if (!data.fullName.trim()) errors.fullName = 'Nama lengkap wajib diisi.';
  if (!data.email.trim()) errors.email = 'Email wajib diisi.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.email = 'Format email tidak valid.';
  if (!data.phone.trim()) errors.phone = 'Nomor telepon wajib diisi.';
  else if (!/^[0-9+\-\s]{8,15}$/.test(data.phone)) errors.phone = 'Format nomor telepon tidak valid.';
  if (!data.university.trim()) errors.university = 'Nama universitas wajib diisi.';
  if (!data.major.trim()) errors.major = 'Program studi wajib diisi.';
  if (!data.semester) errors.semester = 'Semester wajib dipilih.';
  if (!data.motivation.trim()) errors.motivation = 'Motivasi wajib diisi.';
  else if (data.motivation.trim().length < 50) errors.motivation = 'Motivasi minimal 50 karakter.';
  return errors;
}

function ApplyForm() {
  const params = useParams();
  const [internship, setInternship] = useState<Internship | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    university: '',
    major: '',
    semester: '',
    linkedIn: '',
    portfolio: '',
    motivation: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    const id = params?.id as string;
    if (!id) { setNotFound(true); return; }
    const found = getInternshipById(id);
    if (!found) setNotFound(true);
    else setInternship(found);
  }, [params?.id]);

  const handleChange = (field: keyof FormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setLoading(true);
    setTimeout(() => {
      createApplication({
        internshipId: internship!.id,
        internshipTitle: internship!.title,
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        university: formData.university,
        major: formData.major,
        semester: parseInt(formData.semester),
        linkedIn: formData.linkedIn || undefined,
        portfolio: formData.portfolio || undefined,
        motivation: formData.motivation,
      });
      setLoading(false);
      setSubmitted(true);
    }, 800);
  };

  if (notFound) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <h1 className="text-xl font-bold text-[#17231D] mb-2">Lowongan Tidak Ditemukan</h1>
        <Link href="/opportunities">
          <Button>Kembali ke Daftar Lowongan</Button>
        </Link>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="max-w-lg mx-auto px-4 py-20 text-center">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-10">
          <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-5">
            <CheckCircle size={32} className="text-[#16865B]" />
          </div>
          <h2 className="text-xl font-bold text-[#17231D] mb-2">Lamaran Berhasil Dikirim!</h2>
          <p className="text-[#738078] text-sm leading-relaxed mb-2">
            Terima kasih <strong className="text-[#17231D]">{formData.fullName}</strong>! Lamaran Anda untuk posisi{' '}
            <strong className="text-[#17231D]">{internship?.title}</strong> telah berhasil dikirim.
          </p>
          <p className="text-[#738078] text-sm leading-relaxed mb-7">
            Tim kami akan meninjau lamaran Anda dan menghubungi melalui email <strong className="text-[#17231D]">{formData.email}</strong> dalam waktu 5-7 hari kerja.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/opportunities">
              <Button variant="outline">Lihat Lowongan Lain</Button>
            </Link>
            <Link href="/">
              <Button>Kembali ke Beranda</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-[#738078] mb-6">
        <Link href="/" className="hover:text-[#16865B] transition-colors">Beranda</Link>
        <ChevronRight size={14} />
        <Link href="/opportunities" className="hover:text-[#16865B] transition-colors">Lowongan</Link>
        <ChevronRight size={14} />
        <Link href={`/opportunities/${internship?.id}`} className="hover:text-[#16865B] transition-colors truncate max-w-[120px]">
          {internship?.title}
        </Link>
        <ChevronRight size={14} />
        <span className="text-[#17231D] font-medium">Apply</span>
      </nav>

      <div className="mb-7">
        <h1 className="text-2xl font-bold text-[#17231D]">Formulir Pendaftaran Magang</h1>
        {internship && (
          <p className="text-[#738078] text-sm mt-1">
            Mendaftar untuk posisi <strong className="text-[#16865B]">{internship.title}</strong> · {internship.department}
          </p>
        )}
      </div>

      <form onSubmit={handleSubmit} noValidate>
        <div className="space-y-5">
          {/* Personal Info */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="font-semibold text-[#17231D] mb-4 text-sm uppercase tracking-wide text-[#738078]">
              Informasi Pribadi
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Nama Lengkap"
                placeholder="Masukkan nama lengkap"
                value={formData.fullName}
                onChange={handleChange('fullName')}
                error={errors.fullName}
                required
              />
              <Input
                label="Email Address"
                type="email"
                placeholder="nama@email.com"
                value={formData.email}
                onChange={handleChange('email')}
                error={errors.email}
                required
              />
              <Input
                label="Phone Number"
                type="tel"
                placeholder="08xxxxxxxxxx"
                value={formData.phone}
                onChange={handleChange('phone')}
                error={errors.phone}
                required
              />
            </div>
          </div>

          {/* Academic Info */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="font-semibold text-sm uppercase tracking-wide text-[#738078] mb-4">
              Informasi Akademik
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Universitas"
                placeholder="Nama universitas"
                value={formData.university}
                onChange={handleChange('university')}
                error={errors.university}
                required
              />
              <Input
                label="Program Studi / Jurusan"
                placeholder="Contoh: Teknik Informatika"
                value={formData.major}
                onChange={handleChange('major')}
                error={errors.major}
                required
              />
              <Select
                label="Semester Saat Ini"
                options={semesterOptions}
                placeholder="Pilih semester"
                value={formData.semester}
                onChange={handleChange('semester')}
                error={errors.semester}
                required
              />
            </div>
          </div>

          {/* Links */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="font-semibold text-sm uppercase tracking-wide text-[#738078] mb-4">
              Profil & Portofolio (Opsional)
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="LinkedIn Profile"
                type="url"
                placeholder="https://linkedin.com/in/username"
                value={formData.linkedIn}
                onChange={handleChange('linkedIn')}
                hint="URL profil LinkedIn Anda"
              />
              <Input
                label="Portfolio / GitHub URL"
                type="url"
                placeholder="https://github.com/username"
                value={formData.portfolio}
                onChange={handleChange('portfolio')}
                hint="Link portofolio atau GitHub Anda"
              />
            </div>
          </div>

          {/* Motivation */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="font-semibold text-sm uppercase tracking-wide text-[#738078] mb-4">
              Motivasi
            </h2>
            <Textarea
              label="Motivasi Singkat"
              placeholder="Ceritakan mengapa Anda tertarik bergabung dengan DaunHijau dan apa yang ingin Anda capai selama magang..."
              rows={5}
              value={formData.motivation}
              onChange={handleChange('motivation')}
              error={errors.motivation}
              hint={`${formData.motivation.length} karakter (minimal 50)`}
              required
            />
          </div>

          {/* Submit */}
          <div className="flex flex-col sm:flex-row gap-3 justify-end">
            <Link href={`/opportunities/${internship?.id}`}>
              <Button variant="outline" type="button" className="w-full sm:w-auto">
                <ArrowLeft size={14} />
                Kembali
              </Button>
            </Link>
            <Button type="submit" loading={loading} size="lg" className="w-full sm:w-auto">
              Kirim Lamaran
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default function ApplyPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-2 border-[#16865B] border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <ApplyForm />
    </Suspense>
  );
}
