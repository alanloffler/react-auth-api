import {
  GalleryVerticalEnd,
  KeyRound,
  LayoutDashboard,
  OctagonAlert,
  Package,
  Settings,
  Shield,
  ShieldPlus,
  User2,
  UserPlus2,
} from "lucide-react";

import { KeyRoundPlus } from "@components/icons/KeyRoundPlus";
import { NavMain } from "@components/nav-main";
import { NavProjects } from "@components/nav-projects";
import { NavUser } from "@components/nav-user";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from "@components/ui/sidebar";
import { TeamSwitcher } from "@components/team-switcher";

import { useAuthStore } from "@auth/auth.store";

const data = {
  teams: {
    name: "React Auth API",
    logo: GalleryVerticalEnd,
    plan: "v 0.1",
  },
  navMain: [
    {
      title: "Administradores",
      url: "/admin",
      icon: User2,
      permission: "admin-view",
    },
    {
      title: "Roles",
      url: "/roles",
      icon: Shield,
      permission: "roles-view",
    },
    {
      title: "Permisos",
      url: "/permissions",
      icon: KeyRound,
      permission: "permissions-view",
    },
    {
      title: "Configuraciones",
      url: "#",
      icon: Settings,
      items: [
        {
          title: "Aplicación",
          url: "/app-settings",
          icon: Package,
        },
        {
          title: "Tablero",
          url: "/dashboard-settings",
          icon: LayoutDashboard,
        },
      ],
      permission: "*",
    },
  ],
  projects: [
    {
      name: "Crear administrador",
      url: "/admin/create",
      icon: UserPlus2,
      permission: "admin-create",
    },
    {
      name: "Crear rol",
      url: "/roles/create",
      icon: ShieldPlus,
      permission: "roles-create",
    },
    {
      name: "Crear permiso",
      url: "/permissions/create",
      icon: KeyRoundPlus,
      permission: "permissions-create",
    },
    {
      name: "404",
      url: "/404",
      icon: OctagonAlert,
      permission: "*",
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const adminPermissions = useAuthStore(
    (state) =>
      state.admin?.role?.rolePermissions
        ?.filter((rp) => rp.permission !== null)
        ?.map((rp) => rp.permission?.actionKey)
        ?.sort()
        .join(",") || "",
  );

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent key={adminPermissions}>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
