interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export default function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      {icon && (
        <div className="mb-4 p-4 rounded-full bg-[#F7F9F5] text-[#738078]">{icon}</div>
      )}
      <h3 className="text-base font-semibold text-[#17231D] mb-1">{title}</h3>
      {description && <p className="text-sm text-[#738078] max-w-sm">{description}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
