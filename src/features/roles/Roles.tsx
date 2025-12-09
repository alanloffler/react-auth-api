import { Ban, Eye, Plus, RotateCcw, Trash2, TriangleAlert } from "lucide-react";

import { Button } from "@components/ui/button";
import { DataTable } from "@components/DataTable";
import { Forbidden } from "@auth/components/Forbidden";
import { HoldButton } from "@components/ui/HoldButton";
import { Link } from "react-router";
import { PageHeader } from "@components/pages/PageHeader";

import type { ColumnDef } from "@tanstack/react-table";
import { toast } from "sonner";
import { useCallback, useEffect, useState } from "react";

import type { IRole } from "@roles/interfaces/role.interface";
import { ERoles } from "@auth/enums/role.enum";
import { RolesService } from "@roles/services/roles.service";
import { tryCatch } from "@core/utils/try-catch";
import { useAuthStore } from "@auth/auth.store";

export default function Roles() {
  const [roles, setRoles] = useState<IRole[] | undefined>(undefined);
  const admin = useAuthStore((state) => state.admin);

  const fetchRoles = useCallback(async () => {
    const isSuperAdmin = admin?.role.value === ERoles.SUPER;
    const serviceByRole = isSuperAdmin ? RolesService.findAllSoftRemoved() : RolesService.findAll();

    const [response, error] = await tryCatch(serviceByRole);

    if (error) {
      toast.error(error.message);
      return;
    }

    if (response && response.statusCode === 200) {
      setRoles(response.data);
    }
  }, [admin?.role.value]);

  useEffect(() => {
    fetchRoles();
  }, [fetchRoles]);

  async function removeRole(id: string): Promise<void> {
    const [response, error] = await tryCatch(RolesService.softRemove(id));

    if (error) {
      toast.error(error.message);
      return;
    }

    if (response && response.statusCode === 200) {
      toast.success(response.message);
      fetchRoles();
    }
  }

  async function hardRemoveRole(id: string): Promise<void> {
    const [response, error] = await tryCatch(RolesService.remove(id));

    if (error) {
      toast.error(error.message);
      return;
    }

    if (response && response.statusCode === 200) {
      toast.success(response.message);
      fetchRoles();
    }
  }

  async function restoreRole(id: string): Promise<void> {
    const [response, error] = await tryCatch(RolesService.restore(id));

    if (error) {
      toast.error(error.message);
      return;
    }

    if (response && response.statusCode === 200) {
      toast.success(response.message);
      fetchRoles();
    }
  }

  const columns: ColumnDef<IRole>[] = [
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
      accessorKey: "name",
      header: "Nombre",
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <span>{row.original.name}</span>
          {row.original.deletedAt && <Ban className="h-4 w-4 text-rose-500" />}
        </div>
      ),
    },
    {
      accessorKey: "value",
      header: "Valor",
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <div className="flex justify-end gap-2">
          {row.original.deletedAt ? (
            <HoldButton callback={() => restoreRole(row.original.id)} size="icon" type="restore" variant="outline">
              <RotateCcw className="h-4 w-4" />
            </HoldButton>
          ) : (
            <>
              <Button className="px-5!" variant="outline" asChild>
                <Link to={`/roles/view/${row.original.id}`}>
                  <Eye className="h-4 w-4" />
                </Link>
              </Button>
              <Forbidden to={[ERoles.ADMIN, ERoles.TEACHER]}>
                <HoldButton callback={() => removeRole(row.original.id)} size="icon" type="delete" variant="outline">
                  <Trash2 className="h-4 w-4" />
                </HoldButton>
              </Forbidden>
              <Forbidden to={[ERoles.ADMIN, ERoles.TEACHER]} variant="invisible">
                <HoldButton
                  callback={() => hardRemoveRole(row.original.id)}
                  size="icon"
                  type="delete"
                  variant="outline"
                >
                  <TriangleAlert className="h-4 w-4 stroke-red-500" />
                  <Trash2 className="h-4 w-4" />
                </HoldButton>
              </Forbidden>
            </>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-10">
      <PageHeader title="Roles" subtitle="Gestioná los roles para los usuarios del sistema.">
        <Button variant="default" size="lg" asChild>
          <Link to="/roles/create">
            <Plus />
            Crear rol
          </Link>
        </Button>
      </PageHeader>
      <DataTable columns={columns} data={roles} />
    </div>
  );
}
