// import { Folder, Forward, MoreHorizontal, Trash2, type LucideIcon } from "lucide-react";
import { type LucideIcon } from "lucide-react";

// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
import { Link } from "react-router";
import { Protected } from "@auth/components/Protected";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  // SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  // useSidebar,
} from "@components/ui/sidebar";

import type { ComponentType, SVGProps } from "react";

import type { TPermission } from "@permissions/interfaces/permission.type";
import { useActiveRoute } from "@core/hooks/useActiveRoute";
import { useSettingsStore } from "@settings/stores/settings.store";

interface IProps {
  items: INavAction[];
}

interface INavAction {
  icon: LucideIcon | ComponentType<SVGProps<SVGSVGElement>>;
  name: string;
  permission: TPermission;
  url: string;
}

export function NavActions({ items }: IProps) {
  // const { isMobile } = useSidebar();
  const { appSettings } = useSettingsStore();
  const { isActive } = useActiveRoute();

  const showMenuIcons = appSettings.find((s) => s.key === "showMenuIcons")?.value === "true";

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Acciones rápidas</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem key={item.name}>
            <Protected requiredPermission={item.permission}>
              <SidebarMenuButton asChild isActive={isActive(item.url)}>
                <Link to={item.url}>
                  {showMenuIcons && <item.icon />}
                  <span>{item.name}</span>
                </Link>
              </SidebarMenuButton>
            </Protected>
            {/* <DropdownMenu> */}
            {/*   <DropdownMenuTrigger asChild> */}
            {/*     <SidebarMenuAction showOnHover> */}
            {/*       <MoreHorizontal /> */}
            {/*       <span className="sr-only">More</span> */}
            {/*     </SidebarMenuAction> */}
            {/*   </DropdownMenuTrigger> */}
            {/*   <DropdownMenuContent */}
            {/*     className="w-48 rounded-lg" */}
            {/*     side={isMobile ? "bottom" : "right"} */}
            {/*     align={isMobile ? "end" : "start"} */}
            {/*   > */}
            {/*     <DropdownMenuItem> */}
            {/*       <Folder className="text-muted-foreground" /> */}
            {/*       <span>View Project</span> */}
            {/*     </DropdownMenuItem> */}
            {/*     <DropdownMenuItem> */}
            {/*       <Forward className="text-muted-foreground" /> */}
            {/*       <span>Share Project</span> */}
            {/*     </DropdownMenuItem> */}
            {/*     <DropdownMenuSeparator /> */}
            {/*     <DropdownMenuItem> */}
            {/*       <Trash2 className="text-muted-foreground" /> */}
            {/*       <span>Delete Project</span> */}
            {/*     </DropdownMenuItem> */}
            {/*   </DropdownMenuContent> */}
            {/* </DropdownMenu> */}
          </SidebarMenuItem>
        ))}
        {/* <SidebarMenuItem> */}
        {/*   <SidebarMenuButton className="text-sidebar-foreground/70"> */}
        {/*     <MoreHorizontal className="text-sidebar-foreground/70" /> */}
        {/*     <span>More</span> */}
        {/*   </SidebarMenuButton> */}
        {/* </SidebarMenuItem> */}
      </SidebarMenu>
    </SidebarGroup>
  );
}
