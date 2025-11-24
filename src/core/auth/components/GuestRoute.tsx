import { useEffect, type ReactNode } from "react";
import { useNavigate } from "react-router";

import { AuthService } from "@auth/auth.service";
import { useAuthStore } from "@core/auth/auth.store";

interface IProps {
  children: ReactNode;
}

export function GuestRoute({ children }: IProps) {
  const navigate = useNavigate();
  const { admin, setAdmin, loadingAdmin, setLoadingAdmin } = useAuthStore();

  useEffect(() => {
    async function getAdmin() {
      try {
        const response = await AuthService.getAdmin();
        setAdmin(response.data);
      } catch (error) {
        setAdmin(undefined);
      } finally {
        setLoadingAdmin(false);
      }
    }

    if (loadingAdmin) getAdmin();
  }, [loadingAdmin]);

  useEffect(() => {
    if (!loadingAdmin && admin) {
      navigate("/home", { replace: true });
    }
  }, [loadingAdmin, admin]);

  if (loadingAdmin) return null;

  return children;
}
