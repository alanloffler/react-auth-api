import { ChevronRight, type LucideIcon } from "lucide-react";

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@components/ui/sidebar";
import { Link } from "react-router";

import { useAuthStore } from "@core/auth/auth.store";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

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
      role: string[];
    }[];
    role?: string[];
  }[];
}) {
  const { admin } = useAuthStore();

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Aplicación</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <Collapsible key={item.title} asChild defaultOpen={item.isActive} className="group/collapsible">
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton
                  disabled={item.role && admin?.role && !item.role?.includes(admin.role.value)}
                  tooltip={item.title}
                >
                  {item.icon && <item.icon />}
                  {item.items ? (
                    <>
                      <span>{item.title}</span>
                      <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </>
                  ) : (
                    <Link to={item.url} className="flex w-full">
                      {item.title}
                    </Link>
                  )}
                </SidebarMenuButton>
              </CollapsibleTrigger>
              {item.items && (
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.items?.map((subItem) => (
                      <SidebarMenuSubItem key={subItem.title}>
                        <SidebarMenuSubButton asChild>
                          <Link
                            to={subItem.url}
                            className={cn(
                              subItem.role && admin?.role && !subItem.role?.includes(admin.role.value)
                                ? "pointer-events-none opacity-50"
                                : "",
                            )}
                          >
                            <span>{subItem.title}</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              )}
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
