import { Home } from "@/features/home/Home";

import { Navigate } from "react-router";
import { useAuthStore } from "@core/auth/auth.store";

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

  return <Home />;
}
