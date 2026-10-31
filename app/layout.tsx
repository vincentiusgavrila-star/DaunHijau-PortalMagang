import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'DaunHijau Internship Portal',
  description: 'Platform portal magang resmi DaunHijau – temukan kesempatan magang terbaik dan kembangkan karir Anda bersama kami.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
