import { MainLayout } from "@layouts/MainLayout";
import { Navigate } from "react-router";

import { useAuthStore } from "@auth/stores/auth.store";

interface IProps {
  allowedRoles?: string[];
}

export function ProtectedLayout({ allowedRoles }: IProps) {
  const admin = useAuthStore((state) => state.admin);

  if (!admin) {
    return <Navigate to="/" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(admin.role.value)) {
    return <Navigate to="/dashboard" replace />;
  }

  return <MainLayout />;
}
