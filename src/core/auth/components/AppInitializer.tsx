import { AuthService } from "@auth/auth.service";
import { useAuthStore } from "@core/auth/auth.store";
import { useEffect, useState, type ReactNode } from "react";

interface IProps {
  children: ReactNode;
}

export function AppInitializer({ children }: IProps) {
  const [isInitialized, setIsInitialized] = useState<boolean>(false);
  const admin = useAuthStore((state) => state.admin);
  const setAdmin = useAuthStore((state) => state.setAdmin);

  useEffect(() => {
    let isMounted = true;

    async function initAuth() {
      try {
        if (admin) {
          const response = await AuthService.getAdmin();
          if (isMounted) setAdmin(response.data);
        }
      } catch {
        if (isMounted) setAdmin(undefined);
      } finally {
        if (isMounted) setIsInitialized(true);
      }
    }

    initAuth();

    return () => {
      isMounted = false;
    };
  }, []);

  if (!isInitialized) {
    return null;
  }

  return <>{children}</>;
}
