import { Ban, Eye, FilePenLine, Plus, RotateCcw, Trash2 } from "lucide-react";

import { Badge } from "@components/Badge";
import { Button } from "@components/ui/button";
import { DataTable } from "@components/data-table/DataTable";
import { HoldButton } from "@components/ui/HoldButton";
import { Link } from "react-router";
import { PageHeader } from "@components/pages/PageHeader";
import { Protected } from "@auth/components/Protected";
import { SortableHeader } from "@components/data-table/SortableHeader";

import type { ColumnDef } from "@tanstack/react-table";
import { toast } from "sonner";
import { useCallback, useEffect, useState } from "react";

import type { IAdmin } from "@admin/interfaces/admin.interface";
import { AdminService } from "@admin/services/admin.service";
import { ERoles } from "@auth/enums/role.enum";
import { tryCatch } from "@core/utils/try-catch";
import { useAuthStore } from "@auth/auth.store";

export default function Admin() {
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

  async function hardRemoveAdmin(id: string): Promise<void> {
    const [response, error] = await tryCatch(AdminService.remove(id));

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
      enableSorting: false,
      header: () => <div className="text-center">ID</div>,
      cell: ({ row }) => (
        <div className="flex justify-center">
          <Badge size="small" variant="id">
            {row.original.id.slice(0, 5)}
          </Badge>
        </div>
      ),
    },
    {
      accessorKey: "ic",
      header: ({ column }) => (
        <SortableHeader alignment="center" column={column}>
          DNI
        </SortableHeader>
      ),
      cell: ({ row }) => (
        <div className="flex justify-center">
          <Badge size="small" variant="ic">
            {row.original.ic}
          </Badge>
        </div>
      ),
    },
    {
      accessorKey: "userName",
      header: ({ column }) => <SortableHeader column={column}>Usuario</SortableHeader>,
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <span>{row.original.userName}</span>
          {row.original.deletedAt && <Ban className="h-4 w-4 text-rose-500" />}
        </div>
      ),
    },
    {
      accessorKey: "firstName",
      enableHiding: true,
      header: ({ column }) => <SortableHeader column={column}>Nombre</SortableHeader>,
    },
    {
      accessorKey: "lastName",
      header: ({ column }) => <SortableHeader column={column}>Apellido</SortableHeader>,
    },
    {
      accessorKey: "role.name",
      header: ({ column }) => (
        <SortableHeader alignment="center" column={column}>
          Rol
        </SortableHeader>
      ),
      cell: ({ row }) => (
        <div className="flex justify-center">
          <Badge size="small" variant="role">
            {row.original.role.name}
          </Badge>
        </div>
      ),
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <div className="flex justify-end gap-2">
          <Button className="px-5! hover:text-sky-500" variant="outline" asChild>
            <Link to={`/admin/view/${row.original.id}`}>
              <Eye className="h-4 w-4" />
            </Link>
          </Button>
          {!row.original.deletedAt && (
            <Protected requiredPermission="admin-update">
              <Button className="px-5! hover:text-green-500" variant="outline" asChild>
                <Link to={`/admin/edit/${row.original.id}`}>
                  <FilePenLine className="h-4 w-4" />
                </Link>
              </Button>
            </Protected>
          )}
          {row.original.deletedAt ? (
            <HoldButton callback={() => restoreAdmin(row.original.id)} size="icon" type="restore" variant="outline">
              <RotateCcw className="h-4 w-4" />
            </HoldButton>
          ) : (
            <>
              <Protected requiredPermission="admin-delete">
                {admin && row.original.ic !== admin.ic && (
                  <HoldButton callback={() => removeAdmin(row.original.id)} size="icon" type="delete" variant="outline">
                    <Trash2 className="h-4 w-4" />
                  </HoldButton>
                )}
              </Protected>
              <Protected requiredPermission="admin-delete-hard">
                {admin && row.original.ic !== admin.ic && (
                  <HoldButton
                    callback={() => hardRemoveAdmin(row.original.id)}
                    size="icon"
                    type="hard-delete"
                    variant="outline"
                  >
                    <Trash2 className="h-4 w-4" />
                    <span>!</span>
                  </HoldButton>
                )}
              </Protected>
            </>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-8">
      <PageHeader title="Administradores" subtitle="Gestioná los administradores del sistema">
        <Protected requiredPermission="admin-create">
          <Button variant="default" size="lg" asChild>
            <Link to="/admin/create">
              <Plus />
              Crear admin
            </Link>
          </Button>
        </Protected>
      </PageHeader>
      <DataTable
        columns={columns}
        data={admins}
        defaultPageSize={10}
        defaultSorting={[{ id: "userName", desc: false }]}
        pageSizes={[5, 10, 20, 50]}
      />
    </div>
  );
}
