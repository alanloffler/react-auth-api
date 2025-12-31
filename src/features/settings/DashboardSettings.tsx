import { LockKeyhole } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card";
import { Loader } from "@components/Loader";
import { PageHeader } from "@components/pages/PageHeader";
import { Switch } from "@components/ui/switch";

import { useState } from "react";

import type { TSyncMode } from "@settings/interfaces/sync-mode.type";
import { ERoles } from "@auth/enums/role.enum";
import { useAuthStore } from "@auth/stores/auth.store";
import { usePermission } from "@permissions/hooks/usePermission";
import { useSettingsStore } from "@settings/stores/settings.store";

export default function DashboardSettings() {
  const [syncMode, setSyncMode] = useState<TSyncMode>("local");
  const admin = useAuthStore((state) => state.admin);
  const canEditSettings = usePermission("settings-update");
  const { dashboardSettings, loadingDashboardSettings, updateDashboardSetting } = useSettingsStore();

  return (
    <div className="flex flex-col gap-8">
      <PageHeader title="Configuraciones de la aplicación">
        {admin?.role.value === ERoles.SUPER && (
          <div className="flex items-center gap-3">
            <label className="text-sm font-medium">
              Actualizar en {syncMode === "remote" ? "base de datos" : "local"}
            </label>
            <Switch
              checked={syncMode === "remote" ? true : false}
              onCheckedChange={(value) => setSyncMode(value === true ? "remote" : "local")}
            />
          </div>
        )}
      </PageHeader>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
        <Card className="relative col-span-1 gap-3 lg:col-span-3 2xl:col-span-2">
          <CardHeader>
            <CardTitle>Tablero</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-1 flex-col gap-2">
            {dashboardSettings.map((setting) => (
              <div className="flex items-center gap-3" key={setting.id}>
                <Switch
                  disabled={!canEditSettings || loadingDashboardSettings[setting.id]}
                  id={setting.id}
                  checked={setting.value === "true"}
                  onCheckedChange={(checked) => {
                    updateDashboardSetting(setting.id, checked.toString(), syncMode);
                  }}
                />
                <label className="select-none hover:cursor-pointer" htmlFor={setting.id}>
                  {setting.title}
                </label>
                {loadingDashboardSettings[setting.id] && <Loader color="#000" />}
                {!canEditSettings && <LockKeyhole className="text-muted-foreground h-3.5 w-3.5" />}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
