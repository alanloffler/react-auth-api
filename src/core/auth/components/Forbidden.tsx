import type { ReactNode } from "react";

import { useAuthStore } from "@auth/auth.store";

type TVariant = "disabled" | "invisible";

interface IProps {
  children: ReactNode;
  to: string[];
  variant?: TVariant;
}

export function Forbidden({ children, to, variant = "disabled" }: IProps) {
  const admin = useAuthStore((state) => state.admin);

  if (admin && to.includes(admin.role.value)) {
    if (variant === "disabled") {
      return <div className="pointer-events-none cursor-pointer opacity-50">{children}</div>;
    }

    return;
  }
}
