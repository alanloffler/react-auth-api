import { ArrowLeft, Check, FilePenLine, RotateCcw, Trash2 } from "lucide-react";

import { Activity } from "react";
import { Badge } from "@components/Badge";
import { Button } from "@components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@components/ui/card";
import { HoldButton } from "@components/ui/HoldButton";
import { Link } from "react-router";
import { PageHeader } from "@components/pages/PageHeader";
import { Protected } from "@core/auth/components/Protected";

import { toast } from "sonner";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useParams } from "react-router";

import type { IRole, IRolePermissions } from "@roles/interfaces/role.interface";
import { ERoles } from "@auth/enums/role.enum";
import { RolesService } from "@roles/services/roles.service";
import { tryCatch } from "@core/utils/try-catch";
import { useAuthStore } from "@auth/auth.store";
import { usePermission } from "@core/hooks/usePermission";

export default function ViewRole() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [role, setRole] = useState<IRole | undefined>(undefined);
  const admin = useAuthStore((state) => state.admin);
  const hasPermissions = usePermission(["roles-delete", "roles-delete-hard", "roles-restore", "roles-update"], "some");
  const navigate = useNavigate();
  const { id } = useParams();

  const findOneRole = useCallback(
    async function (id: string) {
      setIsLoading(true);

      const isSuperAdmin = admin?.role.value === ERoles.SUPER;
      const serviceByRole = isSuperAdmin ? RolesService.findOneSoftRemoved(id) : RolesService.findOne(id);
      const [response, responseError] = await tryCatch(serviceByRole);

      setIsLoading(false);

      if (responseError) {
        toast.error(responseError.message);
        return;
      }

      if (response && response.statusCode === 200) {
        setRole(response.data);
      }
    },
    [admin?.role.value],
  );

  useEffect(() => {
    findOneRole(id!);
  }, [id, findOneRole]);

  const groupByCategory = (rolePermissions: IRolePermissions[]) => {
    if (!rolePermissions) return {};

    const grouped: Record<string, typeof rolePermissions> = {};

    rolePermissions.forEach((rp) => {
      const category = rp.permission?.category;
      if (category) {
        if (!grouped[category]) {
          grouped[category] = [];
        }
        grouped[category].push(rp);
      }
    });

    return grouped;
  };

  async function removeRole(id: string): Promise<void> {
    const [response, error] = await tryCatch(RolesService.softRemove(id));

    if (error) {
      toast.error(error.message);
      return;
    }

    if (response && response.statusCode === 200) {
      toast.success(response.message);
      navigate(-1);
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
      navigate(-1);
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
      findOneRole(id);
    }
  }

  function translate(content: string) {
    if (content === "admin") return "Administradores";
    if (content === "permissions") return "Permisos";
    return content.charAt(0).toUpperCase() + content.slice(1);
  }

  return (
    <section className="flex flex-col gap-10">
      <PageHeader title="Detalles del rol" />
      <Card className="relative w-full max-w-180 p-10 text-center">
        {isLoading ? (
          <div className="min-w-80">Cargando...</div>
        ) : (
          <>
            <Button className="absolute top-5 right-5" variant="ghost" size="icon-lg" asChild>
              <Link to="/roles">
                <ArrowLeft className="size-5 cursor-pointer" />
              </Link>
            </Button>
            <CardHeader>
              <CardTitle className="text-xl">{role?.name}</CardTitle>
              <CardDescription className="text-base">{role?.value}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 space-y-6 px-0">
              <ul className="space-y-2 text-start">
                <li className="flex gap-5">
                  <span className="font-semibold">Nombre</span>
                  <span>{role?.name}</span>
                </li>
                <li className="flex gap-5">
                  <span className="font-semibold">Valor</span>
                  <span>{role?.value}</span>
                </li>
                <li className="flex flex-col items-start">
                  <span className="font-semibold">Descripción</span>
                  <span>{role?.description}</span>
                </li>
                <div className="grid grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <span className="font-semibold">Permisos:</span>
                    <ul className="grid gap-2 pl-5">
                      {role?.rolePermissions && role.rolePermissions.length > 0 ? (
                        Object.entries(groupByCategory(role?.rolePermissions)).map(([category, permissions]) => (
                          <div className="flex flex-col gap-1" key={`category-block-${category}`}>
                            <div className="text-xs font-semibold text-neutral-600 uppercase">
                              {translate(category)}
                            </div>
                            <ul className="flex flex-col gap-1">
                              {permissions.map((rp, idx) => (
                                <li
                                  key={`permission-${idx}`}
                                  className="flex items-center gap-2 text-sm font-medium text-neutral-600"
                                >
                                  <span className="bg-primary/20 rounded-full p-1">
                                    <Check className="text-primary h-2.5 w-2.5" />
                                  </span>
                                  {rp.permission?.name}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))
                      ) : (
                        <span>Sin permisos</span>
                      )}
                    </ul>
                  </div>
                  <div className="flex flex-col items-start">
                    <span className="font-semibold">Usando este rol:</span>
                    {role?.admins?.length && role.admins.length > 0 ? (
                      <ul className="flex flex-col gap-2 pl-5">
                        {role?.admins.map((item, idx) => (
                          <li className="flex items-center gap-3" key={`admins-${item.id}`}>
                            <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-neutral-200/70 text-xs">
                              {idx + 1}
                            </span>
                            <span className="font-medium">@{item.userName}</span>
                            <span className="text-sm">
                              <Button className="h-fit p-0" variant="link" asChild>
                                <Link to={`/admin/view/${item.id}`}>
                                  {item.firstName} {item.lastName}
                                </Link>
                              </Button>
                            </span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <span>Sin usuarios</span>
                    )}
                  </div>
                </div>
              </ul>
              <p className="text-muted-foreground px-0 text-left">{`Creado el ${role && new Date(role.createdAt.split("T")[0]).toLocaleDateString()}`}</p>
            </CardContent>
            <Activity mode={hasPermissions ? "visible" : "hidden"}>
              <CardFooter className="justify-end gap-3 px-0">
                {role?.deletedAt !== null ? (
                  <div className="flex w-full items-center justify-between">
                    <Badge size="small" variant="red">
                      Eliminado
                    </Badge>
                    <Protected requiredPermission="roles-restore">
                      <HoldButton callback={() => id && restoreRole(id)} size="icon" type="restore" variant="outline">
                        <RotateCcw className="h-4 w-4" />
                      </HoldButton>
                    </Protected>
                  </div>
                ) : (
                  <>
                    {role?.value !== ERoles.SUPER ? (
                      <>
                        <Protected requiredPermission="roles-update">
                          <Button className="px-5! hover:text-green-500" variant="outline" asChild>
                            <Link to={`/roles/edit/${id}`}>
                              <FilePenLine className="h-4 w-4" />
                            </Link>
                          </Button>
                        </Protected>
                        <Protected requiredPermission="roles-delete">
                          <HoldButton callback={() => id && removeRole(id)} size="icon" type="delete" variant="outline">
                            <Trash2 className="h-4 w-4" />
                          </HoldButton>
                        </Protected>
                        <Protected requiredPermission="roles-delete-hard">
                          <HoldButton
                            callback={() => id && hardRemoveRole(id)}
                            size="icon"
                            type="hard-delete"
                            variant="outline"
                          >
                            <Trash2 className="h-4 w-4" />
                            <span>!</span>
                          </HoldButton>
                        </Protected>
                      </>
                    ) : (
                      admin?.role.value === ERoles.SUPER && (
                        <Protected requiredPermission="roles-update">
                          <Button className="px-5! hover:text-green-500" variant="outline" asChild>
                            <Link to={`/roles/edit/${id}`}>
                              <FilePenLine className="h-4 w-4" />
                            </Link>
                          </Button>
                        </Protected>
                      )
                    )}
                  </>
                )}
              </CardFooter>
            </Activity>
          </>
        )}
      </Card>
    </section>
  );
}
