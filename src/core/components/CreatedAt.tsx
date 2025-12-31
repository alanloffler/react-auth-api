import { CalendarArrowUp } from "lucide-react";

import type { ReactNode } from "react";

interface IProps {
  children: ReactNode;
}

export function CreatedAt({ children }: IProps) {
  return (
    <p className="text-muted-foreground flex items-center gap-3 px-0 text-left text-sm">
      <CalendarArrowUp className="h-4.5 w-4.5" />
      {children}
    </p>
  );
}
