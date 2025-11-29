import type { ReactNode } from "react";
import { Navigate, Outlet } from "react-router";
import { useAuthStore } from "@core/auth/auth.store";

interface IProps {
  allowedRoles?: string[];
  children: ReactNode;
  redirectTo?: string;
}

export function ProtectedRoute({ children, allowedRoles, redirectTo = "/" }: IProps) {
  const admin = useAuthStore((state) => state.admin);

  if (!admin) {
    return <Navigate to="/" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(admin.role.value)) {
    return <Navigate to={redirectTo} replace />;
  }

  return children ? <>{children}</> : <Outlet />;
}
