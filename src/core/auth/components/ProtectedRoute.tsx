import { Navigate, Outlet } from "react-router";

import type { ReactNode } from "react";

import { useAuthStore } from "@auth/stores/auth.store";

interface IProps {
  children: ReactNode;
  redirectTo?: string;
  requiredPermission?: string | string[];
}

export function ProtectedRoute({ children, redirectTo = "/", requiredPermission }: IProps) {
  const admin = useAuthStore((state) => state.admin);

  if (!admin) {
    return <Navigate to="/" replace />;
  }

  const adminPermissions = admin.role.rolePermissions ?? [];

  const required = Array.isArray(requiredPermission)
    ? requiredPermission
    : requiredPermission
      ? [requiredPermission]
      : [];

  const hasAllPermissions = required.every((r) => adminPermissions.some((p) => p.permission?.actionKey === r));

  if (required.length > 0 && !hasAllPermissions) {
    return <Navigate to={redirectTo} replace />;
  }

  return children ? <>{children}</> : <Outlet />;
}
