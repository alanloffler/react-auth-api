import { OctagonX, Plus, Trash2 } from "lucide-react";

import { Button } from "@components/ui/button";
import { DataTable } from "@admin/components/DataTable";
import { HoldButton } from "@components/ui/HoldButton";
import { Link } from "react-router";
import { PageHeader } from "@components/pages/PageHeader";

import type { ColumnDef } from "@tanstack/react-table";
import { toast } from "sonner";
import { useCallback, useEffect, useState } from "react";

import type { IAdmin } from "@admin/interfaces/admin.interface";
import { AdminService } from "@admin/services/admin.service";
import { ERoles } from "@auth/enums/role.enum";
import { tryCatch } from "@core/utils/try-catch";
import { useAuthStore } from "@auth/auth.store";
import { Forbidden } from "@/core/auth/components/Forbidden";

export function Admin() {
  const [admins, setAdmins] = useState<IAdmin[] | undefined>(undefined);
  const admin = useAuthStore((state) => state.admin);

  const fetchAdmins = useCallback(async () => {
    const isSuperAdmin = admin?.role.value === ERoles.SUPER;
    const serviceByRole = isSuperAdmin ? AdminService.findAllSoftRemoved() : AdminService.findAll();

    const [response, error] = await tryCatch(serviceByRole);

    if (error) {
      toast.error(error.message);
      return;
    }

    if (response && response.statusCode === 200) {
      setAdmins(response.data);
    }
  }, [admin?.role.value]);

  useEffect(() => {
    fetchAdmins();
  }, [fetchAdmins]);

  async function removeAdmin(id: string): Promise<void> {
    const [response, error] = await tryCatch(AdminService.softRemove(id));

    if (error) {
      toast.error(error.message);
      return;
    }

    if (response && response.statusCode === 200) {
      toast.success(response.message);
      fetchAdmins();
    }
  }

  async function restoreAdmin(id: string) {
    const [response, error] = await tryCatch(AdminService.restore(id));

    if (error) {
      toast.error(error.message);

      return;
    }

    if (response && response.statusCode === 200) {
      toast.success(response.message);
      fetchAdmins();
    }
  }

  const columns: ColumnDef<IAdmin>[] = [
    {
      accessorKey: "id",
      header: () => <div className="text-center">ID</div>,
      cell: ({ row }) => (
        <div className="flex w-fit place-self-center rounded-sm bg-neutral-100 px-2 py-1 text-xs text-neutral-600">
          {row.original.id.slice(0, 5)}
        </div>
      ),
    },
    {
      accessorKey: "ic",
      header: () => <div className="text-center">DNI</div>,
      cell: ({ row }) => (
        <div className="flex w-fit place-self-center rounded-sm bg-neutral-200 px-2 py-1 text-xs text-neutral-700">
          {row.original.ic}
        </div>
      ),
    },
    {
      accessorKey: "userName",
      header: "Usuario",
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <span>{`@${row.original.userName}`}</span>
          {row.original.deletedAt && <OctagonX className="h-5 w-5 text-rose-500" />}
        </div>
      ),
    },
    {
      accessorKey: "firstName",
      header: "Nombre",
      enableHiding: true,
    },
    {
      accessorKey: "lastName",
      header: "Apellido",
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <div className="flex justify-end gap-2">
          <Button variant="outline" asChild>
            <Link to={`/admin/view/${row.original.id}`}>Ver</Link>
          </Button>
          {!row.original.deletedAt && (
            <Forbidden to={[ERoles.TEACHER]} variant="invisible">
              <Button variant="outline" asChild>
                <Link to={`/admin/edit/${row.original.id}`}>Editar</Link>
              </Button>
            </Forbidden>
          )}
          {row.original.deletedAt ? (
            <Button variant="outline" onClick={() => restoreAdmin(row.original.id)}>
              Restore
            </Button>
          ) : (
            <Forbidden to={[ERoles.TEACHER]} variant="invisible">
              {admin && row.original.ic !== admin.ic && (
                <HoldButton callback={() => removeAdmin(row.original.id)} variant="outline">
                  <Trash2 className="h-4 w-4" />
                  Remove
                </HoldButton>
              )}
            </Forbidden>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-10">
      <PageHeader title="Administradores" subtitle="Gestioná los usuarios del sistema.">
        <Button variant="default" size="lg" asChild>
          <Link to="/admin/create">
            <Plus />
            Crear admin
          </Link>
        </Button>
      </PageHeader>
      <DataTable columns={columns} data={admins} />
    </div>
  );
}
