'use client';

import Link from 'next/link';
import { Calendar, MapPin, Clock, Building2, ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { Internship } from '@/types';

interface InternshipCardProps {
  internship: Internship;
}

function formatDeadline(dateStr: string) {
  const date = new Date(dateStr);
  return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
}

export default function InternshipCard({ internship }: InternshipCardProps) {
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    setIsExpired(new Date(internship.deadline) < new Date());
  }, [internship.deadline]);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 p-5 flex flex-col gap-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <Badge label={internship.status} />
            <Badge label={internship.workType} />
          </div>
          <h3 className="text-base font-semibold text-[#17231D] leading-snug">{internship.title}</h3>
        </div>
        <div className="p-2.5 rounded-xl bg-[#F7F9F5] shrink-0">
          <Building2 size={20} className="text-[#16865B]" />
        </div>
      </div>

      <p className="text-sm text-[#738078] line-clamp-2 leading-relaxed">{internship.description}</p>

      <div className="grid grid-cols-2 gap-2 text-xs text-[#738078]">
        <span className="flex items-center gap-1.5">
          <Building2 size={12} className="text-[#16865B]" />
          {internship.department}
        </span>
        <span className="flex items-center gap-1.5">
          <MapPin size={12} className="text-[#16865B]" />
          {internship.location}
        </span>
        <span className="flex items-center gap-1.5">
          <Clock size={12} className="text-[#16865B]" />
          {internship.duration}
        </span>
        <span className={`flex items-center gap-1.5 ${isExpired ? 'text-red-400' : ''}`}>
          <Calendar size={12} className={isExpired ? 'text-red-400' : 'text-[#16865B]'} />
          {isExpired ? 'Expired' : formatDeadline(internship.deadline)}
        </span>
      </div>

      <div className="mt-auto pt-2 border-t border-gray-50">
        <Link href={`/opportunities/${internship.id}`} className="block">
          <Button variant="outline" size="sm" className="w-full group">
            View Details
            <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
