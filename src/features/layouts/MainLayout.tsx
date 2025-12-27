import { AppSidebar } from "@components/app-sidebar";
import { HeaderBreadcrumb } from "@components/Breadcrumb";
import { Outlet } from "react-router";
import { Separator } from "@components/ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@components/ui/sidebar";

export function MainLayout() {
  return (
    <SidebarProvider className="h-full overflow-hidden">
      <AppSidebar />
      <SidebarInset className="flex h-full flex-col overflow-hidden">
        <header className="z-50 flex h-16 shrink-0 items-center gap-2 border-b shadow-lg shadow-white transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
            <HeaderBreadcrumb />
          </div>
        </header>
        <div className="flex flex-1 flex-col overflow-y-auto p-8">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
