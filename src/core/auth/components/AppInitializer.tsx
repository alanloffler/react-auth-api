import { useEffect, useRef, useState, type ReactNode } from "react";

import { AuthService } from "@auth/services/auth.service";
import { useAuthStore } from "@core/auth/auth.store";

interface IProps {
  children: ReactNode;
}

export function AppInitializer({ children }: IProps) {
  const [isInitialized, setIsInitialized] = useState<boolean>(false);
  const hasInitialized = useRef<boolean>(false);

  useEffect(() => {
    if (hasInitialized.current) return;
    hasInitialized.current = true;

    let isMounted = true;

    async function initAuth() {
      const { admin, setAdmin } = useAuthStore.getState();

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
