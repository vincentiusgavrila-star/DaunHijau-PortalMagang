'use client';

import { useEffect, useState } from 'react';
import { Trash2, Eye, Search, Mail, Phone, University, BookOpen, Calendar, Link as LinkIcon } from 'lucide-react';
import { Application, ApplicationStatus } from '@/types';
import { getApplications, updateApplicationStatus, deleteApplication } from '@/lib/storage';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import Modal, { ConfirmDialog } from '@/components/ui/Modal';
import EmptyState from '@/components/ui/EmptyState';

const STATUS_OPTIONS: ApplicationStatus[] = ['Pending', 'Reviewing', 'Accepted', 'Rejected'];

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
}

export default function AdminApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<ApplicationStatus | 'All'>('All');
  const [viewTarget, setViewTarget] = useState<Application | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Application | null>(null);

  useEffect(() => {
    setApplications(getApplications());
  }, []);

  const refresh = () => setApplications(getApplications());

  const filtered = applications.filter((a) => {
    const matchSearch =
      a.fullName.toLowerCase().includes(search.toLowerCase()) ||
      a.internshipTitle.toLowerCase().includes(search.toLowerCase()) ||
      a.university.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'All' || a.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const handleStatusChange = (id: string, status: ApplicationStatus) => {
    updateApplicationStatus(id, status);
    refresh();
    if (viewTarget?.id === id) {
      setViewTarget((prev) => (prev ? { ...prev, status } : null));
    }
  };

  const handleDelete = () => {
    if (!deleteTarget) return;
    deleteApplication(deleteTarget.id);
    refresh();
    setDeleteTarget(null);
  };

  return (
    <div className="p-6 md:p-8 max-w-6xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#17231D]">Application Management</h1>
        <p className="text-[#738078] text-sm mt-1">Kelola semua data pendaftaran magang.</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="relative flex-1 max-w-sm">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#738078]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari nama, posisi, atau universitas..."
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm text-[#17231D] placeholder-[#738078] focus:outline-none focus:ring-2 focus:ring-[#16865B]/40 focus:border-[#16865B] transition-all"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as ApplicationStatus | 'All')}
          className="px-3 py-2.5 rounded-xl border border-gray-200 bg-white text-sm text-[#17231D] focus:outline-none focus:ring-2 focus:ring-[#16865B]/40 focus:border-[#16865B] transition-all"
        >
          <option value="All">Semua Status</option>
          {STATUS_OPTIONS.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      <p className="text-sm text-[#738078] mb-4">
        Menampilkan <span className="font-semibold text-[#17231D]">{filtered.length}</span> aplikasi
      </p>

      {filtered.length === 0 ? (
        <EmptyState
          icon={<Search size={28} />}
          title="Tidak ada aplikasi ditemukan"
          description="Coba ubah kata kunci atau filter status."
        />
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-[#F7F9F5]">
                  <th className="text-left px-5 py-3 font-semibold text-[#738078] text-xs uppercase tracking-wider">Pendaftar</th>
                  <th className="text-left px-4 py-3 font-semibold text-[#738078] text-xs uppercase tracking-wider hidden md:table-cell">Posisi</th>
                  <th className="text-left px-4 py-3 font-semibold text-[#738078] text-xs uppercase tracking-wider hidden lg:table-cell">Universitas</th>
                  <th className="text-left px-4 py-3 font-semibold text-[#738078] text-xs uppercase tracking-wider hidden sm:table-cell">Tanggal</th>
                  <th className="text-left px-4 py-3 font-semibold text-[#738078] text-xs uppercase tracking-wider">Status</th>
                  <th className="px-4 py-3 font-semibold text-[#738078] text-xs uppercase tracking-wider text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map((app) => (
                  <tr key={app.id} className="hover:bg-[#F7F9F5]/60 transition-colors">
                    <td className="px-5 py-3.5">
                      <p className="font-medium text-[#17231D]">{app.fullName}</p>
                      <p className="text-xs text-[#738078] mt-0.5">{app.email}</p>
                    </td>
                    <td className="px-4 py-3.5 hidden md:table-cell">
                      <p className="text-[#738078]">{app.internshipTitle}</p>
                    </td>
                    <td className="px-4 py-3.5 hidden lg:table-cell">
                      <p className="text-[#738078]">{app.university}</p>
                      <p className="text-xs text-[#738078]/70">{app.major} · Sem. {app.semester}</p>
                    </td>
                    <td className="px-4 py-3.5 hidden sm:table-cell">
                      <span className="flex items-center gap-1.5 text-[#738078]">
                        <Calendar size={12} className="text-[#16865B]" />
                        {formatDate(app.appliedAt)}
                      </span>
                    </td>
                    <td className="px-4 py-3.5">
                      <select
                        value={app.status}
                        onChange={(e) => handleStatusChange(app.id, e.target.value as ApplicationStatus)}
                        className="px-2 py-1 rounded-lg border border-gray-200 bg-white text-xs font-medium text-[#17231D] focus:outline-none focus:ring-1 focus:ring-[#16865B]/40 cursor-pointer"
                      >
                        {STATUS_OPTIONS.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setViewTarget(app)}
                          className="p-1.5 rounded-lg text-[#738078] hover:text-[#16865B] hover:bg-[#16865B]/10 transition-colors"
                          aria-label="View details"
                        >
                          <Eye size={15} />
                        </button>
                        <button
                          onClick={() => setDeleteTarget(app)}
                          className="p-1.5 rounded-lg text-[#738078] hover:text-red-500 hover:bg-red-50 transition-colors"
                          aria-label="Delete"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* View Detail Modal */}
      <Modal
        isOpen={!!viewTarget}
        title="Detail Pendaftar"
        onClose={() => setViewTarget(null)}
        size="lg"
      >
        {viewTarget && (
          <div className="space-y-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="font-bold text-[#17231D] text-lg">{viewTarget.fullName}</h3>
                <p className="text-sm text-[#738078]">Melamar: <span className="text-[#16865B] font-medium">{viewTarget.internshipTitle}</span></p>
              </div>
              <div className="flex items-center gap-2">
                <Badge label={viewTarget.status} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center gap-2 text-sm text-[#738078]">
                <Mail size={14} className="text-[#16865B] shrink-0" />
                <span className="truncate">{viewTarget.email}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-[#738078]">
                <Phone size={14} className="text-[#16865B] shrink-0" />
                {viewTarget.phone}
              </div>
              <div className="flex items-center gap-2 text-sm text-[#738078]">
                <University size={14} className="text-[#16865B] shrink-0" />
                <span className="truncate">{viewTarget.university}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-[#738078]">
                <BookOpen size={14} className="text-[#16865B] shrink-0" />
                {viewTarget.major} · Sem. {viewTarget.semester}
              </div>
              {viewTarget.linkedIn && (
                <div className="flex items-center gap-2 text-sm text-[#738078] col-span-2">
                  <LinkIcon size={14} className="text-[#16865B] shrink-0" />
                  <a href={viewTarget.linkedIn} target="_blank" rel="noopener noreferrer" className="text-[#16865B] hover:underline truncate">
                    LinkedIn Profile
                  </a>
                </div>
              )}
              {viewTarget.portfolio && (
                <div className="flex items-center gap-2 text-sm text-[#738078] col-span-2">
                  <LinkIcon size={14} className="text-[#16865B] shrink-0" />
                  <a href={viewTarget.portfolio} target="_blank" rel="noopener noreferrer" className="text-[#16865B] hover:underline truncate">
                    Portfolio / GitHub
                  </a>
                </div>
              )}
              <div className="flex items-center gap-2 text-sm text-[#738078] col-span-2">
                <Calendar size={14} className="text-[#16865B] shrink-0" />
                Mendaftar {formatDate(viewTarget.appliedAt)}
              </div>
            </div>

            <div className="bg-[#F7F9F5] rounded-xl p-4">
              <p className="text-xs font-semibold text-[#738078] uppercase tracking-wider mb-2">Motivasi</p>
              <p className="text-sm text-[#17231D] leading-relaxed">{viewTarget.motivation}</p>
            </div>

            <div>
              <p className="text-xs font-semibold text-[#738078] uppercase tracking-wider mb-2">Ubah Status</p>
              <div className="flex flex-wrap gap-2">
                {STATUS_OPTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => handleStatusChange(viewTarget.id, s)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors border ${
                      viewTarget.status === s
                        ? 'bg-[#16865B] text-white border-[#16865B]'
                        : 'text-[#738078] border-gray-200 hover:border-[#16865B] hover:text-[#16865B]'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-end pt-2 border-t border-gray-100">
              <Button variant="danger" size="sm" onClick={() => { setDeleteTarget(viewTarget); setViewTarget(null); }}>
                <Trash2 size={14} />
                Hapus Aplikasi
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Delete Confirm */}
      <ConfirmDialog
        isOpen={!!deleteTarget}
        title="Hapus Aplikasi"
        message={`Apakah Anda yakin ingin menghapus aplikasi dari "${deleteTarget?.fullName}"? Tindakan ini tidak dapat dibatalkan.`}
        confirmLabel="Hapus"
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
