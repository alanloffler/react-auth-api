import { ArrowLeft, Trash2, TriangleAlert } from "lucide-react";

import { Activity } from "react";
import { Button } from "@components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@components/ui/card";
import { HoldButton } from "@components/ui/HoldButton";
import { Link } from "react-router";
import { Protected } from "@core/auth/components/Protected";

import { toast } from "sonner";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useParams } from "react-router";

import type { IPermission } from "@permissions/interfaces/permission.interface";
import { PermissionsService } from "@permissions/services/permissions.service";
import { tryCatch } from "@core/utils/try-catch";
import { useAuthStore } from "@auth/auth.store";

const FOOTER_ACTIONS = ["permissions-delete", "permissions-delete-hard", "permissions-restore", "permissions-update"];

export default function ViewPermission() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [permission, setPermission] = useState<IPermission | undefined>(undefined);
  const [showFooter, setShowFooter] = useState<boolean>(false);
  const admin = useAuthStore((state) => state.admin);
  const navigate = useNavigate();
  const { id } = useParams();

  const findOnePermission = useCallback(
    async function (id: string) {
      setIsLoading(true);

      const [response, responseError] = await tryCatch(PermissionsService.findOne(id));

      setIsLoading(false);

      if (responseError) {
        toast.error(responseError.message);
        return;
      }

      if (response && response.statusCode === 200) {
        setPermission(response.data);

        setShowFooter(
          admin?.role?.rolePermissions?.some((p) => p.permission && FOOTER_ACTIONS.includes(p.permission.actionKey)) ??
            false,
        );
      }
    },
    [admin],
  );

  useEffect(() => {
    if (id) {
      findOnePermission(id);
    }
  }, [id, findOnePermission]);

  async function hardRemovePermission(id: string): Promise<void> {
    const [response, error] = await tryCatch(PermissionsService.remove(id));

    if (error) {
      toast.error(error.message);
      return;
    }

    if (response && response.statusCode === 200) {
      toast.success(response.message);
      navigate(-1);
    }
  }

  return (
    <Card className="relative w-full max-w-180 p-10 text-center">
      {isLoading ? (
        <div className="min-w-80">Cargando...</div>
      ) : (
        <>
          <Button className="absolute top-5 right-5" variant="ghost" size="icon-lg" asChild>
            <Link to="/permissions">
              <ArrowLeft className="size-5 cursor-pointer" />
            </Link>
          </Button>
          <CardHeader>
            <CardTitle className="text-xl">{permission?.name}</CardTitle>
            <CardDescription className="text-base">{permission?.category}</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 space-y-6 px-0">
            <ul className="space-y-2 text-start">
              <li className="flex gap-5">
                <span className="font-semibold">Nombre</span>
                <span>{permission?.name}</span>
              </li>
              <li className="flex gap-5">
                <span className="font-semibold">Categoría</span>
                <span>{permission?.category}</span>
              </li>
              <li className="flex gap-5">
                <span className="font-semibold">Acción</span>
                <span>{permission?.actionKey}</span>
              </li>
              <li className="flex gap-5">
                <span className="font-semibold">Descripción</span>
                <span>{permission?.description}</span>
              </li>
            </ul>
            <p className="text-muted-foreground px-0 text-left">{`Creado el ${permission && new Date(permission.createdAt.split("T")[0]).toLocaleDateString()}`}</p>
          </CardContent>
          <Activity mode={showFooter ? "visible" : "hidden"}>
            <CardFooter className="justify-end gap-3 px-0">
              <Protected requiredPermission="permissions-update">
                <Button variant="outline" asChild>
                  <Link to={`/permission/edit/${id}`}>Editar</Link>
                </Button>
              </Protected>
              <Protected requiredPermission="permissions-delete-hard">
                <HoldButton callback={() => hardRemovePermission(id!)} size="icon" type="delete" variant="outline">
                  <TriangleAlert className="h-4 w-4 stroke-red-500" />
                  <Trash2 className="h-4 w-4" />
                </HoldButton>
              </Protected>
            </CardFooter>
          </Activity>
        </>
      )}
    </Card>
  );
}
