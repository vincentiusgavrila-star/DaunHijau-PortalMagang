'use client';

import { useEffect, useState } from 'react';
import { SlidersHorizontal, Briefcase } from 'lucide-react';
import { Internship, InternshipStatus, WorkType } from '@/types';
import { getInternships } from '@/lib/storage';
import InternshipCard from '@/components/public/InternshipCard';
import SearchBar from '@/components/ui/SearchBar';
import EmptyState from '@/components/ui/EmptyState';

const departments = ['All', 'Engineering', 'Design', 'Data & Analytics', 'Marketing', 'Research & Development', 'Product'];
const workTypes: (WorkType | 'All')[] = ['All', 'Remote', 'Hybrid', 'On-site'];
const statuses: (InternshipStatus | 'All')[] = ['All', 'Open', 'Closed'];

export default function OpportunitiesPage() {
  const [internships, setInternships] = useState<Internship[]>([]);
  const [search, setSearch] = useState('');
  const [dept, setDept] = useState('All');
  const [workType, setWorkType] = useState<WorkType | 'All'>('All');
  const [status, setStatus] = useState<InternshipStatus | 'All'>('Open');

  useEffect(() => {
    setInternships(getInternships());
  }, []);

  const filtered = internships.filter((i) => {
    const matchSearch = i.title.toLowerCase().includes(search.toLowerCase()) || i.department.toLowerCase().includes(search.toLowerCase());
    const matchDept = dept === 'All' || i.department === dept;
    const matchWork = workType === 'All' || i.workType === workType;
    const matchStatus = status === 'All' || i.status === status;
    return matchSearch && matchDept && matchWork && matchStatus;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#17231D]">Lowongan Magang</h1>
        <p className="text-[#738078] mt-1">
          Temukan program magang yang tepat untuk mengembangkan potensimu bersama DaunHijau.
        </p>
      </div>

      {/* Search & Filters */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mb-7">
        <div className="flex items-center gap-2 mb-4">
          <SlidersHorizontal size={16} className="text-[#16865B]" />
          <span className="text-sm font-medium text-[#17231D]">Filter & Cari</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <SearchBar
            value={search}
            onChange={setSearch}
            placeholder="Cari posisi atau departemen..."
            className="sm:col-span-2 lg:col-span-1"
          />

          <select
            value={dept}
            onChange={(e) => setDept(e.target.value)}
            className="px-3 py-2.5 rounded-xl border border-gray-200 bg-white text-sm text-[#17231D] focus:outline-none focus:ring-2 focus:ring-[#16865B]/40 focus:border-[#16865B] transition-all"
          >
            {departments.map((d) => (
              <option key={d} value={d}>
                {d === 'All' ? 'Semua Departemen' : d}
              </option>
            ))}
          </select>

          <select
            value={workType}
            onChange={(e) => setWorkType(e.target.value as WorkType | 'All')}
            className="px-3 py-2.5 rounded-xl border border-gray-200 bg-white text-sm text-[#17231D] focus:outline-none focus:ring-2 focus:ring-[#16865B]/40 focus:border-[#16865B] transition-all"
          >
            {workTypes.map((w) => (
              <option key={w} value={w}>
                {w === 'All' ? 'Semua Tipe Kerja' : w}
              </option>
            ))}
          </select>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as InternshipStatus | 'All')}
            className="px-3 py-2.5 rounded-xl border border-gray-200 bg-white text-sm text-[#17231D] focus:outline-none focus:ring-2 focus:ring-[#16865B]/40 focus:border-[#16865B] transition-all"
          >
            {statuses.map((s) => (
              <option key={s} value={s}>
                {s === 'All' ? 'Semua Status' : s}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Results count */}
      <p className="text-sm text-[#738078] mb-4">
        Menampilkan <span className="font-semibold text-[#17231D]">{filtered.length}</span> lowongan
      </p>

      {/* Grid */}
      {filtered.length === 0 ? (
        <EmptyState
          icon={<Briefcase size={28} />}
          title="Tidak ada lowongan ditemukan"
          description="Coba ubah kata kunci pencarian atau filter yang digunakan."
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((internship) => (
            <InternshipCard key={internship.id} internship={internship} />
          ))}
        </div>
      )}
    </div>
  );
}
