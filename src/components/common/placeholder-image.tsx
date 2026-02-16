import { ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface PlaceholderImageProps {
  width?: number;
  height?: number;
  label?: string;
  className?: string;
  showDimensions?: boolean;
}

export function PlaceholderImage({
  width = 1,
  height = 1,
  label,
  className,
  showDimensions = false,
}: PlaceholderImageProps) {
  return (
    <div
      className={cn(
        "flex h-full w-full flex-col items-center justify-center bg-secondary",
        className
      )}
      style={{ aspectRatio: `${width} / ${height}` }}
      role="img"
      aria-label={label ?? "No image"}
    >
      <ImageIcon
        className="h-8 w-8 text-muted-foreground"
        aria-hidden="true"
      />
      {showDimensions && (
        <span className="mt-2 text-xs text-muted-foreground">
          {width} × {height}
        </span>
      )}
      {label && (
        <span className="mt-1 text-xs text-muted-foreground">{label}</span>
      )}
    </div>
  );
}
