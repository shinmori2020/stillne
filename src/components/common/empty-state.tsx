import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { EmptyStateProps } from "@/types/common";

export function EmptyState({ icon: Icon, message, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      {Icon && (
        <Icon
          className="mb-4 h-12 w-12 text-muted-foreground"
          aria-hidden="true"
        />
      )}
      <p className="text-muted-foreground">{message}</p>
      {action && (
        <Button asChild variant="outline" className="mt-4">
          <Link href={action.href}>{action.label}</Link>
        </Button>
      )}
    </div>
  );
}
