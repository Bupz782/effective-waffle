interface SectionTitleProps {
  title: string;
  className?: string;
}

export function SectionTitle({ title, className }: SectionTitleProps) {
  return (
    <div className={className}>
      <h2 className="text-5xl font-medium text-[#0f1941]">{title}</h2>
      <div className="mt-4 h-2 w-[625px] max-w-full bg-[#2175d9]" />
    </div>
  );
}
