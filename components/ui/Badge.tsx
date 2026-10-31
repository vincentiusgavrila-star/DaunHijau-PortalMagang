import { InternshipStatus, ApplicationStatus, WorkType } from '@/types';

type BadgeVariant = InternshipStatus | ApplicationStatus | WorkType | 'default';

const variantMap: Record<string, string> = {
  Open: 'bg-emerald-100 text-emerald-700 border border-emerald-200',
  Closed: 'bg-gray-100 text-gray-600 border border-gray-200',
  Pending: 'bg-yellow-100 text-yellow-700 border border-yellow-200',
  Reviewing: 'bg-blue-100 text-blue-700 border border-blue-200',
  Accepted: 'bg-emerald-100 text-emerald-700 border border-emerald-200',
  Rejected: 'bg-red-100 text-red-600 border border-red-200',
  Remote: 'bg-violet-100 text-violet-700 border border-violet-200',
  Hybrid: 'bg-sky-100 text-sky-700 border border-sky-200',
  'On-site': 'bg-orange-100 text-orange-700 border border-orange-200',
  default: 'bg-gray-100 text-gray-600 border border-gray-200',
};

interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
  className?: string;
}

export default function Badge({ label, variant, className = '' }: BadgeProps) {
  const cls = variantMap[variant ?? label] ?? variantMap.default;
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${cls} ${className}`}
    >
      {label}
    </span>
  );
}
