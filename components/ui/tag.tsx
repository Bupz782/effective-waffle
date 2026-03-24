import { cn } from "@/lib/utils";

interface TagProps {
  label: string;
  active?: boolean;
  onClick?: () => void;
  className?: string;
}

export function Tag({ label, active = false, onClick, className }: TagProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "px-3 py-2 text-sm font-medium rounded-sm border-2 transition-colors",
        active
          ? "bg-[#0f1941] text-white border-[#0f1941]"
          : "bg-[#f7f5f0] text-[#2175d9] border-[#2175d9] hover:bg-white",
        className
      )}
    >
      {label}
    </button>
  );
}
