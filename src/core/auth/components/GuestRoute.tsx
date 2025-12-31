import { Navigate } from "react-router";
import { type ReactNode } from "react";
import { useAuthStore } from "@auth/stores/auth.store";

interface IProps {
  children: ReactNode;
}

export function GuestRoute({ children }: IProps) {
  const admin = useAuthStore((state) => state.admin);

  if (admin) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
}
