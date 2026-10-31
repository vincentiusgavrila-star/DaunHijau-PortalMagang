'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Briefcase, FileText, CheckCircle, Clock, ArrowRight, Calendar, Building2 } from 'lucide-react';
import { getInternships, getApplications } from '@/lib/storage';
import { Internship, Application } from '@/types';
import StatCard from '@/components/ui/StatCard';
import Badge from '@/components/ui/Badge';

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export default function AdminDashboard() {
  const [internships, setInternships] = useState<Internship[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);

  useEffect(() => {
    setInternships(getInternships());
    setApplications(getApplications());
  }, []);

  const stats = {
    totalInternships: internships.length,
    activeInternships: internships.filter((i) => i.status === 'Open').length,
    totalApplications: applications.length,
    pendingApplications: applications.filter((a) => a.status === 'Pending').length,
  };

  const recentApplications = applications.slice(0, 5);
  const recentInternships = internships.slice(0, 4);

  return (
    <div className="p-6 md:p-8 max-w-6xl">
      <div className="mb-7">
        <h1 className="text-2xl font-bold text-[#17231D]">Dashboard</h1>
        <p className="text-[#738078] text-sm mt-1">
          Selamat datang di Admin Dashboard DaunHijau Internship Portal.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          label="Total Internships"
          value={stats.totalInternships}
          icon={<Briefcase size={20} />}
          color="green"
        />
        <StatCard
          label="Active Opportunities"
          value={stats.activeInternships}
          icon={<CheckCircle size={20} />}
          color="emerald"
        />
        <StatCard
          label="Total Applications"
          value={stats.totalApplications}
          icon={<FileText size={20} />}
          color="blue"
        />
        <StatCard
          label="Pending Applications"
          value={stats.pendingApplications}
          icon={<Clock size={20} />}
          color="yellow"
        />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Applications */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-[#17231D]">Aplikasi Terbaru</h2>
            <Link
              href="/admin/applications"
              className="text-xs text-[#16865B] hover:underline flex items-center gap-1"
            >
              Lihat Semua <ArrowRight size={12} />
            </Link>
          </div>
          <div className="space-y-3">
            {recentApplications.length === 0 ? (
              <p className="text-sm text-[#738078] text-center py-6">Belum ada aplikasi masuk.</p>
            ) : (
              recentApplications.map((app) => (
                <div
                  key={app.id}
                  className="flex items-center justify-between gap-3 py-2.5 border-b border-gray-50 last:border-0"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[#17231D] truncate">{app.fullName}</p>
                    <p className="text-xs text-[#738078] truncate">{app.internshipTitle}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <Badge label={app.status} />
                    <span className="text-xs text-[#738078]">{formatDate(app.appliedAt)}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent Internships */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-[#17231D]">Lowongan Terbaru</h2>
            <Link
              href="/admin/internships"
              className="text-xs text-[#16865B] hover:underline flex items-center gap-1"
            >
              Kelola <ArrowRight size={12} />
            </Link>
          </div>
          <div className="space-y-3">
            {recentInternships.length === 0 ? (
              <p className="text-sm text-[#738078] text-center py-6">Belum ada lowongan.</p>
            ) : (
              recentInternships.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between gap-3 py-2.5 border-b border-gray-50 last:border-0"
                >
                  <div className="flex items-center gap-2.5 flex-1 min-w-0">
                    <div className="p-1.5 rounded-lg bg-[#F7F9F5]">
                      <Building2 size={14} className="text-[#16865B]" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-[#17231D] truncate">{item.title}</p>
                      <p className="text-xs text-[#738078]">{item.department}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <Badge label={item.status} />
                    <span className="text-xs text-[#738078] flex items-center gap-1">
                      <Calendar size={11} />
                      {formatDate(item.deadline)}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
