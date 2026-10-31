<div align="center">

<br />

<img src="https://img.shields.io/badge/DaunHijau-Internship_Portal-16865B?style=for-the-badge&logo=leaf&logoColor=B5E853" alt="DaunHijau" height="40" />

<br /><br />

# 🌿 DaunHijau Internship Portal

**Platform portal magang resmi DaunHijau** — menghubungkan talenta muda Indonesia dengan peluang magang di perusahaan teknologi lingkungan terdepan.

<br />

[![Next.js](https://img.shields.io/badge/Next.js_16-000000?style=flat-square&logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Lucide React](https://img.shields.io/badge/Lucide_React-F56565?style=flat-square&logo=react&logoColor=white)](https://lucide.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-B5E853?style=flat-square)](LICENSE)

<br />

![Hero Screenshot](https://placehold.co/900x480/123B2A/B5E853?text=DaunHijau+Internship+Portal&font=montserrat)

</div>

---

## ✨ Fitur Utama

### 🌐 Public Portal (Applicant Side)
| Halaman | Deskripsi |
|---|---|
| **Landing Page** | Hero 3D interaktif, animated scroll, about, benefits, recruitment steps |
| **Opportunities** | Daftar lowongan dengan search & triple filter (departemen, tipe kerja, status) |
| **Internship Detail** | Deskripsi lengkap, tanggung jawab, persyaratan, info program, tombol Apply |
| **Application Form** | Formulir multi-section dengan validasi real-time & success state |

### 🛠️ Admin Dashboard
| Halaman | Deskripsi |
|---|---|
| **Dashboard Overview** | Statistik real-time: total lowongan, aktif, total aplikasi, pending |
| **Internship Management** | CRUD lengkap — tambah, edit, hapus lowongan dengan confirmation dialog |
| **Application Management** | Lihat detail, ubah status, hapus pendaftar + search & filter |

### 🗃️ Data & State
- **LocalStorage persistence** — data tidak hilang setelah refresh
- **Auto seed reset** — mock data terbaru otomatis di-load dengan versioning key
- **18 data aplikasi dummy** dengan berbagai status (Pending, Reviewing, Accepted, Rejected)
- **12 posisi magang** dari 7 departemen berbeda

---

## 🎨 Design System

```
Color Palette:
  Primary     #123B2A   Deep Forest Green
  Secondary   #16865B   Emerald Green
  Accent      #B5E853   Lime Green
  Background  #F7F9F5   Off White
  Surface     #FFFFFF   White
  Text        #17231D   Dark Charcoal
  Muted       #738078   Muted Gray
```

**Konsep visual:** *Futuristic Eco-Tech Corporate* — glassmorphism cards, smooth scroll animations, 3D SVG globe dengan orbit rings di hero, Intersection Observer untuk fade-in per section.

---

## 🚀 Quick Start

### Prerequisites
- Node.js `>=18.x`
- npm `>=9.x`

### Installation

```bash
# Clone repo
git clone https://github.com/vincentiusgavrila-star/DaunHijau-PortalMagang.git
cd DaunHijau-PortalMagang

# Install dependencies
npm install

# Run development server
npm run dev
```

Buka **[http://localhost:3000](http://localhost:3000)** di browser.

> Admin dashboard tersedia di **[http://localhost:3000/admin](http://localhost:3000/admin)**

### Build for Production

```bash
npm run build
npm start
```

---

## 📁 Struktur Project

```
portal-magang/
├── app/
│   ├── (public)/               # Public portal (dengan Navbar + Footer)
│   │   ├── page.tsx            # Landing page (Hero 3D, About, Benefits, Process)
│   │   ├── opportunities/
│   │   │   ├── page.tsx        # Daftar lowongan + filter
│   │   │   └── [id]/page.tsx   # Detail lowongan
│   │   └── apply/[id]/page.tsx # Formulir pendaftaran
│   ├── admin/                  # Admin dashboard (dengan Sidebar)
│   │   ├── page.tsx            # Overview & statistik
│   │   ├── internships/        # CRUD lowongan
│   │   └── applications/       # Manajemen pendaftar
│   ├── layout.tsx              # Root layout
│   └── globals.css
│
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx          # Sticky navbar dengan anchor scroll
│   │   ├── NavLinks.tsx        # Section links (Tentang, Keuntungan, Proses)
│   │   ├── Footer.tsx          # Footer dengan navigasi & kontak
│   │   └── AdminSidebar.tsx    # Sidebar admin
│   ├── public/
│   │   └── InternshipCard.tsx  # Card lowongan magang
│   └── ui/
│       ├── Button.tsx          # Button component (5 variants)
│       ├── Badge.tsx           # Status badge dengan warna otomatis
│       ├── Modal.tsx           # Modal + ConfirmDialog
│       ├── FormInputs.tsx      # Input, Textarea, Select
│       ├── SearchBar.tsx       # Search dengan ikon
│       ├── StatCard.tsx        # Stat card untuk dashboard
│       └── EmptyState.tsx      # Empty state component
│
├── lib/
│   ├── mockData.ts             # 12 internship + 18 aplikasi dummy
│   └── storage.ts              # LocalStorage CRUD + auto-seed versioning
│
└── types/
    └── index.ts                # TypeScript interfaces & types
```

---

## 🧩 Tech Stack

| Teknologi | Versi | Kegunaan |
|---|---|---|
| [Next.js](https://nextjs.org/) | 16.x | Framework utama (App Router) |
| [TypeScript](https://www.typescriptlang.org/) | 5.x | Type safety |
| [Tailwind CSS](https://tailwindcss.com/) | 4.x | Styling utility-first |
| [Lucide React](https://lucide.dev/) | latest | Icon library |
| Browser LocalStorage | — | Persistensi data client-side |

---

## 📸 Screenshots

<div align="center">

| Public Portal | Admin Dashboard |
|:---:|:---:|
| Landing Page Hero | Dashboard Overview |
| Opportunities List | Internship Management |
| Application Form | Application Management |

</div>

---

## 🌱 Tentang DaunHijau

DaunHijau adalah perusahaan teknologi terdepan yang berfokus pada pengembangan solusi digital untuk tantangan lingkungan. Kami menggabungkan kekuatan inovasi teknologi dengan komitmen kuat terhadap keberlanjutan lingkungan hidup.

**Departemen yang membuka magang:**
- 🖥️ Engineering (Frontend, Backend, Mobile, Cloud)
- 🎨 Design (UI/UX)
- 📊 Data & Analytics
- 📣 Marketing (Digital Marketing, Content Writer)
- 🌿 Research & Development (Environmental, Sustainability)
- 📦 Product Management
- 👥 HR & Talent Acquisition

---

## 🤝 Contributing

Pull requests are welcome! Untuk perubahan besar, buka issue terlebih dahulu untuk mendiskusikan perubahan yang diinginkan.

1. Fork repo ini
2. Buat branch fitur (`git checkout -b feature/nama-fitur`)
3. Commit perubahan (`git commit -m 'feat: tambah fitur X'`)
4. Push ke branch (`git push origin feature/nama-fitur`)
5. Buat Pull Request

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

<div align="center">

Made with 💚 by **DaunHijau Tech Team**

*Bergabunglah dengan kami untuk menciptakan masa depan yang lebih hijau* 🌍

</div>
