import { ChevronRight, type LucideIcon } from "lucide-react";

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@components/ui/collapsible";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@components/ui/dropdown-menu";
import { Link } from "react-router";
import { Protected } from "@auth/components/Protected";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@components/ui/sidebar";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
    isActive?: boolean;
    items?: {
      title: string;
      url: string;
    }[];
    permission: string;
  }[];
}) {
  const { state } = useSidebar();

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Aplicación</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) =>
          item.items ? (
            state === "collapsed" ? (
              <SidebarMenuItem key={item.title}>
                <Protected requiredPermission={item.permission}>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <SidebarMenuButton tooltip={item.title} className="group-data-[collapsible=icon]:justify-center">
                        {item.icon && <item.icon />}
                        <span className="group-data-[collapsible=icon]:sr-only">{item.title}</span>
                        <ChevronRight className="ml-auto transition-transform duration-200 group-data-[collapsible=icon]:sr-only" />
                      </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent side="right" align="start" className="min-w-48">
                      {item.items.map((subItem) => (
                        <DropdownMenuItem key={subItem.title} asChild>
                          <Link to={subItem.url}>{subItem.title}</Link>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </Protected>
              </SidebarMenuItem>
            ) : (
              <Collapsible key={item.title} asChild defaultOpen={item.isActive} className="group/collapsible">
                <SidebarMenuItem>
                  <Protected requiredPermission={item.permission}>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton tooltip={item.title} className="group-data-[collapsible=icon]:justify-center">
                        {item.icon && <item.icon />}
                        <span className="group-data-[collapsible=icon]:sr-only">{item.title}</span>
                        <ChevronRight className="ml-auto transition-transform duration-200 group-data-[collapsible=icon]:sr-only group-data-[state=open]/collapsible:rotate-90" />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                  </Protected>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.items.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton asChild>
                            <Link to={subItem.url}>
                              <span>{subItem.title}</span>
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            )
          ) : (
            <SidebarMenuItem key={item.title}>
              <Protected requiredPermission={item.permission}>
                <SidebarMenuButton tooltip={item.title} asChild>
                  <Link to={item.url} className="group-data-[collapsible=icon]:justify-center">
                    {item.icon && <item.icon />}
                    <span className="group-data-[collapsible=icon]:sr-only">{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </Protected>
            </SidebarMenuItem>
          ),
        )}
      </SidebarMenu>
    </SidebarGroup>
  );
}
