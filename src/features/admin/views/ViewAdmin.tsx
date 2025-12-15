import { ArrowLeft, FilePenLine, RotateCcw, Trash2 } from "lucide-react";

import { Button } from "@components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@components/ui/card";
import { HoldButton } from "@components/ui/HoldButton";
import { Link } from "react-router";
import { Protected } from "@auth/components/Protected";

import { useNavigate } from "react-router";
import { toast } from "sonner";
import { Activity, useCallback, useEffect, useState } from "react";
import { useParams } from "react-router";

import type { IAdmin } from "@admin/interfaces/admin.interface";
import { AdminService } from "@admin/services/admin.service";
import { ERoles } from "@auth/enums/role.enum";
import { tryCatch } from "@core/utils/try-catch";
import { useAuthStore } from "@auth/auth.store";
import { usePermission } from "@/core/hooks/usePermission";

export default function ViewAdmin() {
  const [admin, setAdmin] = useState<IAdmin | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const adminAuth = useAuthStore((state) => state.admin);
  const hasPermissions = usePermission(["admin-update", "admin-delete", "admin-delete-hard"], "some");
  const navigate = useNavigate();
  const { id } = useParams();

  const findOneAdmin = useCallback(
    async function (id: string) {
      setIsLoading(true);
      const isSuperAdmin = adminAuth?.role.value === ERoles.SUPER;
      const serviceByRole = isSuperAdmin ? AdminService.findOneSoftRemoved(id) : AdminService.findOne(id);

      const [response, responseError] = await tryCatch(serviceByRole);

      setIsLoading(false);

      if (responseError) {
        toast.error(responseError.message);
        return;
      }

      if (response && response.statusCode === 200) {
        setAdmin(response.data);
      }
    },
    [adminAuth?.role.value],
  );

  async function removeAdmin(id: string): Promise<void> {
    const [response, error] = await tryCatch(AdminService.softRemove(id));

    if (error) {
      toast.error(error.message);
      return;
    }

    if (response && response.statusCode === 200) {
      toast.success(response.message);
      findOneAdmin(id);
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
      navigate(-1);
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
      findOneAdmin(id);
    }
  }

  useEffect(() => {
    findOneAdmin(id!);
  }, [id, findOneAdmin]);

  return (
    <Card className="relative w-fit p-10 text-center">
      {isLoading ? (
        <div className="min-w-80">Cargando...</div>
      ) : (
        <>
          <Button className="absolute top-5 right-5" variant="ghost" size="icon-lg" onClick={() => navigate(-1)}>
            <ArrowLeft className="size-5 cursor-pointer" />
          </Button>
          <CardHeader>
            <CardTitle className="text-xl">{`${admin?.firstName} ${admin?.lastName}`}</CardTitle>
            <CardDescription className="text-base">{admin?.role.name}</CardDescription>
          </CardHeader>
          <CardContent className="min-w-80 flex-1 space-y-6 px-0">
            <ul className="space-y-2">
              <li className="flex justify-between">
                <span className="font-semibold">Usuario</span>
                <span>{admin?.userName}</span>
              </li>
              <li className="flex justify-between">
                <span className="font-semibold">DNI</span>
                <span>{admin?.ic}</span>
              </li>
              <li className="flex justify-between">
                <span className="font-semibold">E-mail</span>
                <span>{admin?.email}</span>
              </li>
              <li className="flex justify-between">
                <span className="font-semibold">Teléfono</span>
                <span>{admin?.phoneNumber}</span>
              </li>
            </ul>
            <p className="text-muted-foreground px-0">{`Usuario desde el ${admin && new Date(admin.createdAt.split("T")[0]).toLocaleDateString()}`}</p>
          </CardContent>
          <Activity mode={hasPermissions ? "visible" : "hidden"}>
            <CardFooter className="justify-end gap-3 px-0">
              {admin?.deletedAt && admin?.deletedAt !== null ? (
                <HoldButton callback={() => id && restoreAdmin(id)} size="icon" type="restore" variant="outline">
                  <RotateCcw className="h-4 w-4" />
                </HoldButton>
              ) : (
                <>
                  <Protected requiredPermission="admin-update">
                    <Button className="px-5!" variant="outline" asChild>
                      <Link to={`/admin/edit/${id}`}>
                        <FilePenLine className="h-4 w-4" />
                      </Link>
                    </Button>
                  </Protected>
                  <Protected requiredPermission="admin-delete">
                    <HoldButton callback={() => id && removeAdmin(id)} size="icon" type="delete" variant="outline">
                      <Trash2 className="h-4 w-4" />
                    </HoldButton>
                  </Protected>
                  <Protected requiredPermission="admin-delete-hard">
                    <HoldButton
                      callback={() => id && hardRemoveAdmin(id)}
                      size="icon"
                      type="hard-delete"
                      variant="outline"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span>!</span>
                    </HoldButton>
                  </Protected>
                </>
              )}
            </CardFooter>
          </Activity>
        </>
      )}
    </Card>
  );
}
