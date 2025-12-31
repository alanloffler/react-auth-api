import type { ReactNode } from "react";

import type { TRole } from "@auth/enums/role.enum";
import { useAuthStore } from "@auth/stores/auth.store";

type TVariant = "disabled" | "invisible";

interface IProps {
  children: ReactNode;
  to: TRole[];
  variant?: TVariant;
}

export function Forbidden({ children, to, variant = "disabled" }: IProps) {
  const admin = useAuthStore((state) => state.admin);

  if (admin && to.includes(admin.role.value as TRole)) {
    if (variant === "disabled") {
      return <div className="pointer-events-none cursor-pointer opacity-50">{children}</div>;
    }

    return;
  }

  return <>{children}</>;
}
