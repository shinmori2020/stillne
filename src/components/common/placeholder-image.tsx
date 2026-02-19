import { cn } from "@/lib/utils";

export interface PlaceholderImageProps {
  width?: number;
  height?: number;
  label?: string;
  className?: string;
  showDimensions?: boolean;
}

function NoImageIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 120 100"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      {/* Image frame */}
      <rect
        x="10"
        y="10"
        width="100"
        height="70"
        rx="6"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
      {/* Mountain landscape */}
      <path
        d="M10 65 L40 35 L60 55 L75 40 L110 65"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      {/* Sun */}
      <circle cx="85" cy="30" r="8" stroke="currentColor" strokeWidth="3" />
      {/* Diagonal slash (no image) */}
      <line
        x1="15"
        y1="75"
        x2="105"
        y2="15"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
      {/* NO IMAGE text */}
      <text
        x="60"
        y="95"
        textAnchor="middle"
        fill="currentColor"
        fontSize="12"
        fontFamily="sans-serif"
        letterSpacing="1"
      >
        NO IMAGE
      </text>
    </svg>
  );
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
      <NoImageIcon className="h-16 w-16 text-muted-foreground/60" />
      {showDimensions && (
        <span className="mt-2 text-xs text-muted-foreground">
          {width} × {height}
        </span>
      )}
    </div>
  );
}
