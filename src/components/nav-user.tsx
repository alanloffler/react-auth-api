import { BadgeCheck, Ellipsis, LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "@components/ui/sidebar";

import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router";

import { AuthService } from "@core/auth/auth.service";
import { useAuthStore } from "@core/auth/auth.store";

export function NavUser() {
  const { admin, clearAdmin } = useAuthStore();
  const { isMobile } = useSidebar();
  const navigate = useNavigate();

  async function signOut() {
    try {
      const response = await AuthService.signOut();
      clearAdmin();
      toast.success(response.message);
      navigate("/");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message: string = error.response?.data?.message;

        if (message) {
          toast.error(message);
        } else {
          toast.error("Error desconocido en el servidor");
        }
      }
    }
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{`@${admin?.userName}`}</span>
                <span className="truncate text-xs">{admin?.role.name}</span>
              </div>
              <Ellipsis className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <BadgeCheck />
                Cuenta
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="hover:cursor-pointer" onClick={signOut}>
              <LogOut />
              Salir
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
