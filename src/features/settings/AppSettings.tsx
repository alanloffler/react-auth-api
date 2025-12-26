import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@components/ui/card";
import { Checkbox } from "@components/ui/checkbox";
import { PageHeader } from "@components/pages/PageHeader";

import { useState } from "react";
import { usePermission } from "@core/hooks/usePermission";

export default function AppSettings() {
  const [checked1, setChecked1] = useState<boolean>(true);
  const [checked2, setChecked2] = useState<boolean>(true);
  const canEditSettings = usePermission("settings-update");

  return (
    <div className="flex flex-col gap-8">
      <PageHeader title="Configuraciones de la aplicación" />
      <div className="grid grid-cols-2 gap-8">
        <Card className="relative">
          <CardHeader>
            <CardTitle>Aspecto</CardTitle>
            <CardDescription>Configurá los colores de la aplicación</CardDescription>
          </CardHeader>
          <CardContent className="flex-1">
            <div className="flex items-center gap-3">
              <Checkbox
                checked={checked1}
                disabled={!canEditSettings}
                id="colors"
                onCheckedChange={() => {
                  setChecked1(!checked1);
                }}
              />
              <label className="select-none hover:cursor-pointer" htmlFor="colors">
                Contenido que requiere permisos de edición
              </label>
            </div>
          </CardContent>
        </Card>
        <Card className="relative">
          <CardHeader>
            <CardTitle>Tablero</CardTitle>
            <CardDescription>Configurá el tablero de la aplicación</CardDescription>
          </CardHeader>
          <CardContent className="flex-1">
            <div className="flex items-center gap-3">
              <Checkbox
                disabled={!canEditSettings}
                checked={checked2}
                id="dashboard"
                onCheckedChange={() => {
                  setChecked2(!checked2);
                }}
              />
              <label className="select-none hover:cursor-pointer" htmlFor="dashboard">
                Contenido que requiere permisos de edición
              </label>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
