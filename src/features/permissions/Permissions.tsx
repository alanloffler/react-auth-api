import { Ban, Plus, Trash2 } from "lucide-react";

import { Button } from "@components/ui/button";
import { DataTable } from "@components/DataTable";
import { Forbidden } from "@auth/components/Forbidden";
import { HoldButton } from "@components/ui/HoldButton";
import { Link } from "react-router";
import { PageHeader } from "@components/pages/PageHeader";

import type { ColumnDef } from "@tanstack/react-table";
import { toast } from "sonner";
import { useCallback, useEffect, useState } from "react";

import type { IPermission } from "@permissions/interfaces/permission.interface";
import { ERoles } from "@auth/enums/role.enum";
import { PermissionsService } from "@permissions/services/permissions.service";
import { tryCatch } from "@core/utils/try-catch";

export default function Permissions() {
  const [permissions, setPermissions] = useState<IPermission[] | undefined>(undefined);

  const fetchPermissions = useCallback(async () => {
    const [response, error] = await tryCatch(PermissionsService.findAll());

    if (error) {
      toast.error(error.message);
      return;
    }

    if (response && response.statusCode === 200) {
      setPermissions(response.data);
    }
  }, []);

  useEffect(() => {
    fetchPermissions();
  }, [fetchPermissions]);

  async function removeHardPermission(id: string): Promise<void> {
    const [response, error] = await tryCatch(PermissionsService.remove(id));

    if (error) {
      toast.error(error.message);
      return;
    }

    if (response && response.statusCode === 200) {
      toast.success(response.message);
      fetchPermissions();
    }
  }

  const columns: ColumnDef<IPermission>[] = [
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
      accessorKey: "category",
      header: "Categoría",
    },
    {
      accessorKey: "actionKey",
      header: "Acción",
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
      accessorKey: "description",
      header: "Descripción",
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <div className="flex justify-end gap-2">
          <Button variant="outline" asChild>
            <Link to={`/roles/view/${row.original.id}`}>Ver</Link>
          </Button>
          <Forbidden to={[ERoles.ADMIN, ERoles.TEACHER]}>
            <HoldButton callback={() => removeHardPermission(row.original.id)} type="delete" variant="outline">
              <Trash2 className="h-4 w-4" />
              Eliminar
            </HoldButton>
          </Forbidden>
        </div>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-10">
      <PageHeader title="Permisos" subtitle="Gestioná los permisos de acceso para los roles del sistema.">
        <Button variant="default" size="lg" asChild>
          <Link to="/permissions/create">
            <Plus />
            Crear permiso
          </Link>
        </Button>
      </PageHeader>
      <DataTable columns={columns} data={permissions} />
    </div>
  );
}
