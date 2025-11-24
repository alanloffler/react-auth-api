import { Button } from "@/components/ui/button";
import { DataTable } from "@/features/admin/components/DataTable";
import { PageHeader } from "@components/pages/PageHeader";
import type { ColumnDef } from "@tanstack/react-table";
import type { IAdmin } from "@admin/interfaces/admin.interface";
import { AdminService } from "@admin/services/admin.service";
import { cn } from "@/lib/utils";
import { isAxiosError } from "axios";
import { toast } from "sonner";
import { useAuthStore } from "@core/auth/auth.store";
import { useEffect, useState } from "react";

export function Admin() {
  const [admins, setAdmins] = useState<IAdmin[]>([]);
  const [compressedTable, setCompressedTable] = useState(false);
  const [columnVisibility, setColumnVisibility] = useState<any>({});
  const admin = useAuthStore((state) => state.admin);

  useEffect(() => {
    async function fetchAdmins() {
      try {
        const response = await AdminService.getAll();
        console.log(response);
        setAdmins(response.data ?? []);
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

    fetchAdmins();
  }, []);

  function viewAdmin() {
    setCompressedTable(true);
    setColumnVisibility({ firstName: false, lastName: false });
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
      cell: () => (
        <div className="flex justify-end gap-2">
          <Button variant="default" onClick={viewAdmin}>
            Ver
          </Button>
          <Button variant="outline">Editar</Button>
          <Button variant="outline">Eliminar</Button>
        </div>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-10">
      <PageHeader title="Administradores" subtitle="Gestioná los usuarios del sistema." />
      <div>{`Hola ${admin?.firstName}`}</div>
      <div className={cn("flex gap-8")}>
        <DataTable
          columns={columns}
          columnVisibility={columnVisibility}
          data={admins}
          className={cn("transition-all duration-200 ease-in-out", compressedTable ? "w-1/2" : "w-full")}
        />
        {compressedTable && (
          <button
            className="flex w-1/2 bg-red-100"
            onClick={() => {
              setColumnVisibility({ firstName: true, lastName: true });
              setCompressedTable(false);
            }}
          >
            Content here!
          </button>
        )}
      </div>
    </div>
  );
}
