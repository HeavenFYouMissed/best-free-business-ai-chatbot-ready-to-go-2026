import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Prose({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("prose-publishd", className)}>{children}</div>;
}
