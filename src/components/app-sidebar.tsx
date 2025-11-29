import { FileKey, GalleryVerticalEnd, KeyRound, Map, Settings, User2, UserPlus2 } from "lucide-react";
import { NavMain } from "@components/nav-main";
import { NavProjects } from "@components/nav-projects";
import { NavUser } from "@components/nav-user";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from "@components/ui/sidebar";
import { TeamSwitcher } from "@components/team-switcher";

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
      isActive: true,
      role: ["superadmin", "admin"],
    },
    {
      title: "Roles",
      url: "/roles",
      icon: KeyRound,
      role: ["superadmin", "admin"],
    },
    {
      title: "Configuraciones",
      url: "#",
      icon: Settings,
      items: [
        {
          title: "Aplicación",
          url: "/settings/app",
          role: ["superadmin", "admin"],
        },
        {
          title: "Roles",
          url: "/settings/roles",
          role: ["superadmin"],
        },
      ],
      role: ["superadmin", "admin"],
    },
  ],
  projects: [
    {
      name: "Crear administrador",
      url: "#",
      icon: UserPlus2,
    },
    {
      name: "Crear rol",
      url: "#",
      icon: FileKey,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
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
