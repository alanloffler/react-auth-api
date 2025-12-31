import { Moon, Sun } from "lucide-react";

import { Button } from "@components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@components/ui/dropdown-menu";

import { useAuthStore } from "@auth/stores/auth.store";
import { useSettingsStore } from "@settings/stores/settings.store";
import { useTheme } from "@core/providers/theme-provider";

export function ModeToggle() {
  const admin = useAuthStore((state) => state.admin);
  const { appSettings, updateAppSetting } = useSettingsStore();
  const { setTheme } = useTheme();

  async function handleThemeChange(theme: "light" | "dark" | "system") {
    setTheme(theme);

    if (admin) {
      const themeSetting = appSettings.find((setting) => setting.submodule === "theme");
      if (themeSetting) {
        await updateAppSetting(themeSetting.id, theme, "local");
      }
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => handleThemeChange("light")}>Claro</DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleThemeChange("dark")}>Oscuro</DropdownMenuItem>
        {/* <DropdownMenuItem onClick={() => handleThemeChange("system")}>Sistema</DropdownMenuItem> */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
