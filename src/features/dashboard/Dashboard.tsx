import { KeyRound, Shield, ShieldPlus, UserRoundPlus, UsersRound } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Link } from "react-router";
import { PageHeader } from "@/components/pages/PageHeader";
import { Protected } from "@/core/auth/components/Protected";

export function Dashboard() {
  return (
    <div>
      <PageHeader title="Panel de control" subtitle="Administra tu aplicación" />
      <div className="mt-10 flex flex-col gap-10">
        <Protected requiredPermission="admin-view">
          <div className="grid grid-cols-4 gap-8 lg:grid-cols-6 xl:grid-cols-8">
            <Link className="col-span-2" to="/admin">
              <Card className="items-center gap-3 px-6 font-medium hover:bg-neutral-50">
                <UsersRound className="h-6 w-6" />
                <span>Administradores</span>
              </Card>
            </Link>
            <Protected requiredPermission="admin-create">
              <Link className="col-span-2" to="/admin/create">
                <Card className="items-center gap-3 px-6 font-medium hover:bg-neutral-50">
                  <UserRoundPlus className="h-6 w-6" />
                  <span>Crear administrador</span>
                </Card>
              </Link>
            </Protected>
          </div>
        </Protected>
        <Protected requiredPermission="roles-view">
          <div className="grid grid-cols-4 gap-8 lg:grid-cols-6 xl:grid-cols-8">
            <Link className="col-span-2" to="/roles">
              <Card className="items-center gap-3 px-6 font-medium hover:bg-neutral-50">
                <Shield className="h-6 w-6" />
                <span>Roles</span>
              </Card>
            </Link>
            <Protected requiredPermission="roles-create">
              <Link className="col-span-2" to="/roles/create">
                <Card className="items-center gap-3 px-6 font-medium hover:bg-neutral-50">
                  <ShieldPlus className="h-6 w-6" />
                  <span>Crear rol</span>
                </Card>
              </Link>
            </Protected>
          </div>
        </Protected>
        <Protected requiredPermission="permissions-view">
          <div className="grid grid-cols-4 gap-8 lg:grid-cols-6 xl:grid-cols-8">
            <Link className="col-span-2" to="/permissions">
              <Card className="items-center gap-3 px-6 font-medium hover:bg-neutral-50">
                <KeyRound className="h-6 w-6" />
                <span>Permisos</span>
              </Card>
            </Link>
            <Protected requiredPermission="permissions-create">
              <Link className="col-span-2" to="/permissions/create">
                <Card className="items-center gap-3 px-6 font-medium hover:bg-neutral-50">
                  {/* <KeyRound className="h-6 w-6" /> */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-key-round-icon lucide-key-round"
                  >
                    <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z" />
                    <circle cx="16.5" cy="7.5" r=".5" fill="currentColor" />

                    <g>
                      <line
                        x1="18.5"
                        y1="17.5"
                        x2="18.5"
                        y2="25.5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                      <line
                        x1="15.5"
                        y1="20.5"
                        x2="21.5"
                        y2="20.5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </g>
                  </svg>
                  <span>Crear permiso</span>
                </Card>
              </Link>
            </Protected>
          </div>
        </Protected>
      </div>
    </div>
  );
}
