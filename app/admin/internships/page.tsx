'use client';

import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, MapPin, Clock, Calendar, Building2, Search } from 'lucide-react';
import { Internship, WorkType, InternshipStatus } from '@/types';
import { getInternships, createInternship, updateInternship, deleteInternship } from '@/lib/storage';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import Modal, { ConfirmDialog } from '@/components/ui/Modal';
import { Input, Textarea, Select } from '@/components/ui/FormInputs';
import EmptyState from '@/components/ui/EmptyState';

interface InternshipForm {
  title: string;
  department: string;
  description: string;
  responsibilities: string;
  requirements: string;
  location: string;
  workType: WorkType;
  duration: string;
  deadline: string;
  status: InternshipStatus;
}

const emptyForm: InternshipForm = {
  title: '',
  department: '',
  description: '',
  responsibilities: '',
  requirements: '',
  location: '',
  workType: 'Hybrid',
  duration: '3 Bulan',
  deadline: '',
  status: 'Open',
};

const DEPARTMENTS = ['Engineering', 'Design', 'Data & Analytics', 'Marketing', 'Research & Development', 'Product', 'Operations', 'HR'];
const WORK_TYPES: WorkType[] = ['Remote', 'Hybrid', 'On-site'];
const DURATIONS = ['1 Bulan', '2 Bulan', '3 Bulan', '4 Bulan', '5 Bulan', '6 Bulan'];

function toForm(internship: Internship): InternshipForm {
  return {
    title: internship.title,
    department: internship.department,
    description: internship.description,
    responsibilities: internship.responsibilities.join('\n'),
    requirements: internship.requirements.join('\n'),
    location: internship.location,
    workType: internship.workType,
    duration: internship.duration,
    deadline: internship.deadline,
    status: internship.status,
  };
}

function validateInternshipForm(form: InternshipForm): Partial<Record<keyof InternshipForm, string>> {
  const errors: Partial<Record<keyof InternshipForm, string>> = {};
  if (!form.title.trim()) errors.title = 'Judul posisi wajib diisi.';
  if (!form.department.trim()) errors.department = 'Departemen wajib diisi.';
  if (!form.description.trim()) errors.description = 'Deskripsi wajib diisi.';
  if (!form.responsibilities.trim()) errors.responsibilities = 'Tanggung jawab wajib diisi.';
  if (!form.requirements.trim()) errors.requirements = 'Persyaratan wajib diisi.';
  if (!form.location.trim()) errors.location = 'Lokasi wajib diisi.';
  if (!form.deadline) errors.deadline = 'Deadline wajib diisi.';
  return errors;
}

export default function AdminInternshipsPage() {
  const [internships, setInternships] = useState<Internship[]>([]);
  const [search, setSearch] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<Internship | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Internship | null>(null);
  const [form, setForm] = useState<InternshipForm>(emptyForm);
  const [formErrors, setFormErrors] = useState<Partial<Record<keyof InternshipForm, string>>>({});

  useEffect(() => {
    setInternships(getInternships());
  }, []);

  const refresh = () => setInternships(getInternships());

  const filtered = internships.filter(
    (i) =>
      i.title.toLowerCase().includes(search.toLowerCase()) ||
      i.department.toLowerCase().includes(search.toLowerCase())
  );

  const openCreate = () => {
    setEditTarget(null);
    setForm(emptyForm);
    setFormErrors({});
    setIsFormOpen(true);
  };

  const openEdit = (internship: Internship) => {
    setEditTarget(internship);
    setForm(toForm(internship));
    setFormErrors({});
    setIsFormOpen(true);
  };

  const handleFormChange = (field: keyof InternshipForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (formErrors[field]) setFormErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSave = () => {
    const errors = validateInternshipForm(form);
    if (Object.keys(errors).length > 0) { setFormErrors(errors); return; }

    const parsed = {
      ...form,
      responsibilities: form.responsibilities.split('\n').map((s) => s.trim()).filter(Boolean),
      requirements: form.requirements.split('\n').map((s) => s.trim()).filter(Boolean),
    };

    if (editTarget) {
      updateInternship(editTarget.id, parsed);
    } else {
      createInternship(parsed);
    }
    refresh();
    setIsFormOpen(false);
  };

  const handleDelete = () => {
    if (!deleteTarget) return;
    deleteInternship(deleteTarget.id);
    refresh();
    setDeleteTarget(null);
  };

  function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
  }

  return (
    <div className="p-6 md:p-8 max-w-6xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#17231D]">Internship Management</h1>
          <p className="text-[#738078] text-sm mt-1">Kelola semua program magang yang tersedia.</p>
        </div>
        <Button onClick={openCreate} className="shrink-0">
          <Plus size={16} />
          Tambah Lowongan
        </Button>
      </div>

      {/* Search */}
      <div className="relative mb-5 max-w-sm">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#738078]" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Cari posisi atau departemen..."
          className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm text-[#17231D] placeholder-[#738078] focus:outline-none focus:ring-2 focus:ring-[#16865B]/40 focus:border-[#16865B] transition-all"
        />
      </div>

      {/* Table */}
      {filtered.length === 0 ? (
        <EmptyState
          icon={<Building2 size={28} />}
          title="Tidak ada lowongan ditemukan"
          description="Tambahkan lowongan baru atau ubah kata kunci pencarian."
          action={<Button onClick={openCreate}><Plus size={14} />Tambah Lowongan</Button>}
        />
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-[#F7F9F5]">
                  <th className="text-left px-5 py-3 font-semibold text-[#738078] text-xs uppercase tracking-wider">Posisi</th>
                  <th className="text-left px-4 py-3 font-semibold text-[#738078] text-xs uppercase tracking-wider hidden md:table-cell">Dept.</th>
                  <th className="text-left px-4 py-3 font-semibold text-[#738078] text-xs uppercase tracking-wider hidden lg:table-cell">Lokasi</th>
                  <th className="text-left px-4 py-3 font-semibold text-[#738078] text-xs uppercase tracking-wider hidden lg:table-cell">Durasi</th>
                  <th className="text-left px-4 py-3 font-semibold text-[#738078] text-xs uppercase tracking-wider hidden sm:table-cell">Deadline</th>
                  <th className="text-left px-4 py-3 font-semibold text-[#738078] text-xs uppercase tracking-wider">Status</th>
                  <th className="px-4 py-3 font-semibold text-[#738078] text-xs uppercase tracking-wider text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map((item) => (
                  <tr key={item.id} className="hover:bg-[#F7F9F5]/60 transition-colors">
                    <td className="px-5 py-3.5">
                      <p className="font-medium text-[#17231D]">{item.title}</p>
                      <p className="text-xs text-[#738078] mt-0.5 md:hidden">{item.department}</p>
                    </td>
                    <td className="px-4 py-3.5 hidden md:table-cell">
                      <span className="flex items-center gap-1.5 text-[#738078]">
                        <Building2 size={13} className="text-[#16865B]" />
                        {item.department}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 hidden lg:table-cell">
                      <span className="flex items-center gap-1.5 text-[#738078]">
                        <MapPin size={13} className="text-[#16865B]" />
                        {item.location}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 hidden lg:table-cell">
                      <span className="flex items-center gap-1.5 text-[#738078]">
                        <Clock size={13} className="text-[#16865B]" />
                        {item.duration}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 hidden sm:table-cell">
                      <span className="flex items-center gap-1.5 text-[#738078]">
                        <Calendar size={13} className="text-[#16865B]" />
                        {formatDate(item.deadline)}
                      </span>
                    </td>
                    <td className="px-4 py-3.5">
                      <Badge label={item.status} />
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEdit(item)}
                          className="p-1.5 rounded-lg text-[#738078] hover:text-[#16865B] hover:bg-[#16865B]/10 transition-colors"
                          aria-label="Edit"
                        >
                          <Pencil size={15} />
                        </button>
                        <button
                          onClick={() => setDeleteTarget(item)}
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

      {/* Form Modal */}
      <Modal
        isOpen={isFormOpen}
        title={editTarget ? 'Edit Lowongan' : 'Tambah Lowongan Baru'}
        onClose={() => setIsFormOpen(false)}
        size="xl"
      >
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Judul Posisi"
              placeholder="Contoh: Frontend Developer Intern"
              value={form.title}
              onChange={(e) => handleFormChange('title', e.target.value)}
              error={formErrors.title}
              required
            />
            <Select
              label="Departemen"
              options={DEPARTMENTS.map((d) => ({ value: d, label: d }))}
              placeholder="Pilih departemen"
              value={form.department}
              onChange={(e) => handleFormChange('department', e.target.value)}
              error={formErrors.department}
              required
            />
          </div>

          <Textarea
            label="Deskripsi"
            placeholder="Deskripsi program magang..."
            rows={3}
            value={form.description}
            onChange={(e) => handleFormChange('description', e.target.value)}
            error={formErrors.description}
            required
          />

          <Textarea
            label="Tanggung Jawab"
            placeholder="Satu tanggung jawab per baris..."
            rows={4}
            value={form.responsibilities}
            onChange={(e) => handleFormChange('responsibilities', e.target.value)}
            error={formErrors.responsibilities}
            hint="Pisahkan setiap poin dengan baris baru"
            required
          />

          <Textarea
            label="Persyaratan"
            placeholder="Satu persyaratan per baris..."
            rows={4}
            value={form.requirements}
            onChange={(e) => handleFormChange('requirements', e.target.value)}
            error={formErrors.requirements}
            hint="Pisahkan setiap poin dengan baris baru"
            required
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Lokasi"
              placeholder="Contoh: Jakarta, Indonesia"
              value={form.location}
              onChange={(e) => handleFormChange('location', e.target.value)}
              error={formErrors.location}
              required
            />
            <Select
              label="Tipe Kerja"
              options={WORK_TYPES.map((w) => ({ value: w, label: w }))}
              value={form.workType}
              onChange={(e) => handleFormChange('workType', e.target.value)}
            />
            <Select
              label="Durasi"
              options={DURATIONS.map((d) => ({ value: d, label: d }))}
              value={form.duration}
              onChange={(e) => handleFormChange('duration', e.target.value)}
            />
            <Input
              label="Deadline Pendaftaran"
              type="date"
              value={form.deadline}
              onChange={(e) => handleFormChange('deadline', e.target.value)}
              error={formErrors.deadline}
              required
            />
            <Select
              label="Status"
              options={[{ value: 'Open', label: 'Open' }, { value: 'Closed', label: 'Closed' }]}
              value={form.status}
              onChange={(e) => handleFormChange('status', e.target.value)}
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <Button variant="outline" onClick={() => setIsFormOpen(false)}>Batal</Button>
            <Button onClick={handleSave}>{editTarget ? 'Simpan Perubahan' : 'Tambah Lowongan'}</Button>
          </div>
        </div>
      </Modal>

      {/* Delete Confirm */}
      <ConfirmDialog
        isOpen={!!deleteTarget}
        title="Hapus Lowongan"
        message={`Apakah Anda yakin ingin menghapus lowongan "${deleteTarget?.title}"? Tindakan ini tidak dapat dibatalkan.`}
        confirmLabel="Hapus"
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
