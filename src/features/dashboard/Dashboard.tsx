import { Shield, ShieldPlus, UserRoundPlus, UsersRound } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Link } from "react-router";
import { PageHeader } from "@/components/pages/PageHeader";
import { Protected } from "@/core/auth/components/Protected";

export function Dashboard() {
  return (
    <div>
      <PageHeader title="Panel de control" subtitle="Administra tu aplicación" />
      <div className="mt-10 flex flex-col gap-10">
        <div className="grid grid-cols-4 gap-8 lg:grid-cols-6 xl:grid-cols-8">
          <Protected requiredPermission="admin-view">
            <Link className="col-span-2" to="/admin">
              <Card className="items-center gap-3 px-6 font-medium hover:bg-neutral-50">
                <UsersRound className="h-6 w-6" />
                <span>Administradores</span>
              </Card>
            </Link>
          </Protected>
          <Protected requiredPermission="admin-create">
            <Link className="col-span-2" to="/admin/create">
              <Card className="items-center gap-3 px-6 font-medium hover:bg-neutral-50">
                <UserRoundPlus className="h-6 w-6" />
                <span>Crear administrador</span>
              </Card>
            </Link>
          </Protected>
        </div>
        <div className="grid grid-cols-8 gap-8">
          <Protected requiredPermission="roles-view">
            <Link className="col-span-2" to="/roles">
              <Card className="items-center gap-3 px-6 font-medium hover:bg-neutral-50">
                <Shield className="h-6 w-6" />
                <span>Roles</span>
              </Card>
            </Link>
          </Protected>
          <Protected requiredPermission="roles-create">
            <Link className="col-span-2" to="/roles/create">
              <Card className="items-center gap-3 px-6 font-medium hover:bg-neutral-50">
                <ShieldPlus className="h-6 w-6" />
                <span>Crear rol</span>
              </Card>
            </Link>
          </Protected>
        </div>
      </div>
    </div>
  );
}
