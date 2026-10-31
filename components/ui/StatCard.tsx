interface StatCardProps {
  label: string;
  value: number | string;
  icon: React.ReactNode;
  color: 'green' | 'emerald' | 'blue' | 'yellow';
}

const colorMap: Record<StatCardProps['color'], string> = {
  green: 'bg-[#123B2A]/10 text-[#123B2A]',
  emerald: 'bg-emerald-100 text-emerald-700',
  blue: 'bg-blue-100 text-blue-700',
  yellow: 'bg-yellow-100 text-yellow-700',
};

export default function StatCard({ label, value, icon, color }: StatCardProps) {
  return (
    <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
      <div className={`p-3 rounded-xl ${colorMap[color]}`}>{icon}</div>
      <div>
        <p className="text-2xl font-bold text-[#17231D]">{value}</p>
        <p className="text-sm text-[#738078] mt-0.5">{label}</p>
      </div>
    </div>
  );
}
