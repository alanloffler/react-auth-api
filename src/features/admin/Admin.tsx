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
import { EditForm } from "./components/EditForm";

interface IColumnVisibility {
  firstName: boolean;
  lastName: boolean;
}

export function Admin() {
  const [admins, setAdmins] = useState<IAdmin[]>([]);
  const [columnVisibility, setColumnVisibility] = useState<IColumnVisibility>({ firstName: true, lastName: true });
  const [openForm, setOpenForm] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<IAdmin | null>(null);
  const admin = useAuthStore((state) => state.admin);

  useEffect(() => {
    async function fetchAdmins() {
      try {
        const response = await AdminService.findAll();
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

  function viewAdmin(): void {
    setColumnVisibility({ firstName: false, lastName: false });
    setOpenForm(true);
  }

  function editAdmin(user: IAdmin): void {
    setSelectedUser(user);
    setColumnVisibility({ firstName: false, lastName: false });
    setOpenForm(true);
  }

  function closeForm(): void {
    setColumnVisibility({ firstName: true, lastName: true });
    setOpenForm(false);
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
      cell: ({ row }) => (
        <div className="flex justify-end gap-2">
          <Button variant="default" onClick={viewAdmin}>
            Ver
          </Button>
          <Button variant="outline" onClick={() => editAdmin(row.original)}>
            Editar
          </Button>
          <Button variant="outline">Eliminar</Button>
        </div>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-10">
      <PageHeader title="Administradores" subtitle="Gestioná los usuarios del sistema." />
      <div className={cn("flex gap-8")}>
        <DataTable
          columns={columns}
          columnVisibility={columnVisibility}
          data={admins}
          className={cn("transition-all duration-200 ease-in-out", openForm ? "w-1/2" : "w-full")}
        />
        {openForm && selectedUser && <EditForm adminId={selectedUser.id} closeForm={closeForm} />}
      </div>
    </div>
  );
}
