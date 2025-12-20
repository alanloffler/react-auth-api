import { KeyRound, LayoutDashboard, Package, Shield, ShieldPlus, UserRoundPlus, UsersRound } from "lucide-react";

import { ActionCard } from "@dashboard/components/ActionCard";
import { ConfigButton } from "@dashboard/components/ConfigButton";
import { KeyRoundPlus } from "@components/icons/KeyRoundPlus";
import { PageHeader } from "@components/pages/PageHeader";

export default function Dashboard() {
  return (
    <div className="flex flex-col gap-10">
      <PageHeader title="Panel de control" subtitle="Administra tu aplicación" />
      <div className="flex flex-col gap-8">
        <div className="grid grid-cols-4 gap-8 lg:grid-cols-6 xl:grid-cols-8">
          <ActionCard icon={UsersRound} permission="admin-view" text="Administradores" url="/admin" />
          <ActionCard icon={UserRoundPlus} permission="admin-create" text="Crear Administrador" url="/admin/create" />
        </div>
        <div className="grid grid-cols-4 gap-8 lg:grid-cols-6 xl:grid-cols-8">
          <ActionCard icon={Shield} permission="roles-view" text="Roles" url="/roles" />
          <ActionCard icon={ShieldPlus} permission="roles-create" text="Crear rol" url="/roles/create" />
        </div>
        <div className="grid grid-cols-4 gap-8 lg:grid-cols-6 xl:grid-cols-8">
          <ActionCard icon={KeyRound} permission="permissions-view" text="Permisos" url="/permissions" />
          <ActionCard
            icon={KeyRoundPlus}
            permission="permissions-create"
            text="Crear permiso"
            url="/permissions/create"
          />
        </div>
        <div className="flex flex-col gap-3">
          <h1 className="font-semibold">Configuraciones</h1>
          <ul className="flex gap-3 pl-5">
            <li>
              <ConfigButton icon={Package} text="Aplicación" url="/dashboard-settings" />
            </li>
            <li>
              <li>
                <ConfigButton icon={LayoutDashboard} text="Tablero" url="/dashboard-settings" />
              </li>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
