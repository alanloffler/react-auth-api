import { Plus, Trash2 } from "lucide-react";
import { Button } from "@components/ui/button";
import { DataTable } from "@/features/admin/components/DataTable";
import { HoldButton } from "@/components/ui/HoldButton";
import { Link } from "react-router";
import { PageHeader } from "@components/pages/PageHeader";

import type { ColumnDef } from "@tanstack/react-table";
import { isAxiosError } from "axios";
import { toast } from "sonner";
import { useCallback, useEffect, useState } from "react";

import type { IAdmin } from "@admin/interfaces/admin.interface";
import { AdminService } from "@admin/services/admin.service";
import { tryCatch } from "@/core/utils/try-catch";
import { useAuthStore } from "@/core/auth/auth.store";

export function Admin() {
  const [admins, setAdmins] = useState<IAdmin[] | undefined>(undefined);
  const admin = useAuthStore((state) => state.admin);

  const fetchAdmins = useCallback(async () => {
    const [response, error] = await tryCatch(AdminService.findAll());

    if (error) {
      toast.error(error.message);
      return;
    }

    if (response && response.statusCode === 200) {
      setAdmins(response.data);
    }
  }, []);

  useEffect(() => {
    fetchAdmins();
  }, [fetchAdmins]);

  async function removeAdmin(id: string): Promise<void> {
    try {
      const response = await AdminService.remove(id);
      if (response.statusCode === 200) {
        toast.success("Administrador eliminado");
        fetchAdmins();
      }
    } catch (error) {
      if (isAxiosError(error)) {
        if ((error as any).isRefreshFail) {
          return;
        }

        toast.error(error.response?.data.message ?? "Error en el servidor");
        return;
      }

      toast.error("Error desconocido en el servidor");
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
      cell: ({ row }) => <span>{`@${row.original.userName}`}</span>,
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
          <Button variant="outline" asChild>
            <Link to={`/admin/edit/${row.original.id}`}>Editar</Link>
          </Button>
          <HoldButton
            callback={() => removeAdmin(row.original.id)}
            disabled={
              admin?.role.value !== "superadmin" ||
              (row.original.role.value === "superadmin" && row.original.ic === admin.ic)
            }
            variant="outline"
          >
            <Trash2 className="h-4 w-4" />
            Remove
          </HoldButton>
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
