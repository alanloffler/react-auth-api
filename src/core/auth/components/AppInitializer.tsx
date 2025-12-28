import { useEffect, useRef, useState, type ReactNode } from "react";

import { AuthService } from "@auth/services/auth.service";
import { useAuthStore } from "@core/auth/auth.store";
import { useSettingsStore } from "@settings/stores/settings.store";
import { useTheme } from "@core/providers/theme-provider";

interface IProps {
  children: ReactNode;
}

export function AppInitializer({ children }: IProps) {
  const [isInitialized, setIsInitialized] = useState<boolean>(false);
  const hasInitialized = useRef<boolean>(false);
  const { setTheme } = useTheme();

  useEffect(() => {
    if (hasInitialized.current) return;
    hasInitialized.current = true;

    let isMounted = true;

    async function initAuth() {
      const { admin, setAdmin } = useAuthStore.getState();
      const { loadAppSettings, loadDashboardSettings } = useSettingsStore.getState();

      const storedTheme = localStorage.getItem("vite-ui-theme");
      if (storedTheme && (storedTheme === "light" || storedTheme === "dark" || storedTheme === "system")) {
        setTheme(storedTheme);
      }

      try {
        if (admin) {
          const response = await AuthService.getAdmin();
          await loadAppSettings();
          await loadDashboardSettings();

          const { appSettings } = useSettingsStore.getState();
          const themeSetting = appSettings.find((setting) => setting.submodule === "theme");
          if (
            themeSetting &&
            (themeSetting.value === "light" || themeSetting.value === "dark" || themeSetting.value === "system")
          ) {
            setTheme(themeSetting.value);
          }

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
  }, [setTheme]);

  if (!isInitialized) {
    return null;
  }

  return <>{children}</>;
}
