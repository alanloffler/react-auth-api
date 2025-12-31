import type { ReactNode } from "react";

import type { TPermission } from "@permissions/interfaces/permission.type";
import { usePermission } from "@permissions/hooks/usePermission";

interface IProps {
  children: ReactNode;
  requiredPermission: TPermission;
  variant?: "invisible" | "disabled";
}

export function Protected({ children, requiredPermission, variant = "invisible" }: IProps) {
  const hasPermission = usePermission(requiredPermission);

  if (requiredPermission === "*" || !requiredPermission) {
    return children;
  }

  if (!hasPermission) {
    if (variant === "disabled") {
      return <div className="contents *:pointer-events-none *:cursor-not-allowed *:opacity-50">{children}</div>;
    }
    return null;
  }

  return children;
}
