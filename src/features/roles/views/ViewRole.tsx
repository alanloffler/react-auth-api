import { ArrowLeft, Check, RotateCcw, Trash2, TriangleAlert } from "lucide-react";

import { Button } from "@components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@components/ui/card";
import { Forbidden } from "@auth/components/Forbidden";
import { HoldButton } from "@components/ui/HoldButton";
import { Link } from "react-router";

import { toast } from "sonner";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useParams } from "react-router";

import type { IRole, IRolePermissions } from "@roles/interfaces/role.interface";
import { ERoles } from "@auth/enums/role.enum";
import { RolesService } from "@roles/services/roles.service";
import { tryCatch } from "@core/utils/try-catch";

export default function ViewRole() {
  const [role, setRole] = useState<IRole | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const findOneRole = useCallback(async function (id: string) {
    setIsLoading(true);

    const [response, responseError] = await tryCatch(RolesService.findOne(id));

    setIsLoading(false);

    if (responseError) {
      toast.error(responseError.message);
      return;
    }

    if (response && response.statusCode === 200) {
      setRole(response.data);
    }
  }, []);

  useEffect(() => {
    findOneRole(id!);
  }, [id, findOneRole]);

  const groupByCategory = (rolePermissions: IRolePermissions[]) => {
    if (!rolePermissions) return {};

    const grouped: Record<string, typeof rolePermissions> = {};

    rolePermissions.forEach((rp) => {
      const category = rp.permission.category;
      if (!grouped[category]) {
        grouped[category] = [];
      }
      grouped[category].push(rp);
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

  return (
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
                <div>
                  <span className="font-semibold">Permisos:</span>
                  <ul className="grid pl-5">
                    {role?.rolePermissions && role.rolePermissions.length > 0 ? (
                      Object.entries(groupByCategory(role?.rolePermissions)).map(([category, permissions]) => (
                        <div key={category} className="mt-2">
                          <ul className="space-y-1">
                            {permissions.map((rp, idx) => (
                              <li key={idx} className="flex items-center gap-2 text-xs font-medium uppercase">
                                <Check className="h-3 w-3" />
                                {rp.permission.name}
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
                    <ul className="grid pl-5">
                      {role?.admins.map((item) => (
                        <li className="m-0 grid w-full grid-cols-5 items-center gap-5">
                          <span className="col-span-3 p-0 font-medium">@{item.userName}</span>
                          <span className="col-span-2 p-0 text-sm">
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
          <Forbidden to={[ERoles.TEACHER]} variant="invisible">
            <CardFooter className="justify-end gap-3 px-0">
              {role?.deletedAt && role?.deletedAt !== null ? (
                <HoldButton callback={() => console.log("restaurar")} size="icon" type="restore" variant="outline">
                  <RotateCcw className="h-4 w-4" />
                </HoldButton>
              ) : (
                <>
                  <Button variant="outline" asChild>
                    <Link to={`/roles/edit/${id}`}>Editar</Link>
                  </Button>
                  <HoldButton callback={() => removeRole(id!)} size="icon" type="delete" variant="outline">
                    <Trash2 className="h-4 w-4" />
                  </HoldButton>
                  <Forbidden to={[ERoles.ADMIN, ERoles.TEACHER]} variant="invisible">
                    <HoldButton callback={() => hardRemoveRole(id!)} size="icon" type="delete" variant="outline">
                      <TriangleAlert className="h-4 w-4 stroke-red-500" />
                      <Trash2 className="h-4 w-4" />
                    </HoldButton>
                  </Forbidden>
                </>
              )}
            </CardFooter>
          </Forbidden>
        </>
      )}
    </Card>
  );
}
