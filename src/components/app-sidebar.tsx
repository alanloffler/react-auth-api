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
import { NavActions } from "@components/nav-actions";
import { NavUser } from "@components/nav-user";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from "@components/ui/sidebar";
import { TeamSwitcher } from "@components/team-switcher";

import { cn } from "@lib/utils";
import { useAuthStore } from "@auth/auth.store";
import { useEffect, useRef, useState } from "react";
import { useSidebar } from "@components/ui/sidebar";

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
      permission: "settings-view",
    },
  ],
  navActions: [
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

  const contentRef = useRef<HTMLDivElement>(null);
  const [hasScroll, setHasScroll] = useState(false);
  const { openMobile } = useSidebar();

  useEffect(() => {
    const checkScroll = () => {
      if (contentRef.current) {
        const hasVerticalScroll = contentRef.current.scrollHeight > contentRef.current.clientHeight;
        setHasScroll(hasVerticalScroll);
      }
    };

    checkScroll();

    const timeoutId1 = setTimeout(checkScroll, 100);

    window.addEventListener("resize", checkScroll);

    const resizeObserver = new ResizeObserver(checkScroll);
    const element = contentRef.current;
    if (element) {
      resizeObserver.observe(element);
    }

    return () => {
      clearTimeout(timeoutId1);
      window.removeEventListener("resize", checkScroll);
      resizeObserver.disconnect();
    };
  }, [adminPermissions, openMobile]);

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent
        ref={contentRef}
        className={cn(
          hasScroll && "shadow-[inset_0_6px_6px_-6px_rgba(0,0,0,0.1),inset_0_-6px_6px_-6px_rgba(0,0,0,0.1)]",
        )}
        key={adminPermissions}
      >
        <NavMain items={data.navMain} />
        <NavActions items={data.navActions} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
