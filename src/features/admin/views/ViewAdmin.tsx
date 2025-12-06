import { ArrowLeft } from "lucide-react";
import { Button } from "@components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@components/ui/card";
import { Forbidden } from "@auth/components/Forbidden";
import { Link } from "react-router";

import type { IAdmin } from "@admin/interfaces/admin.interface";
import { AdminService } from "@admin/services/admin.service";
import { ERoles } from "@auth/enums/role.enum";
import { toast } from "sonner";
import { tryCatch } from "@core/utils/try-catch";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

export default function ViewAdmin() {
  const [admin, setAdmin] = useState<IAdmin | undefined>(undefined);
  const { id } = useParams();

  async function findOneAdmin(id: string) {
    const [response, responseError] = await tryCatch(AdminService.findOne(id!));

    if (responseError) {
      toast.error(responseError.message);

      return;
    }

    if (response && response.statusCode === 200) {
      setAdmin(response.data);
    }
  }

  useEffect(() => {
    findOneAdmin(id!);
  }, [id]);

  return (
    <Card className="relative w-fit p-10 text-center">
      <Button className="absolute top-5 right-5" variant="ghost" size="icon-lg" asChild>
        <Link to="/admin">
          <ArrowLeft className="size-5 cursor-pointer" />
        </Link>
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
      <CardFooter className="justify-end! gap-3 px-0">
        <Button variant="outline" asChild>
          <Link to={`/admin/edit/${id}`}>Editar</Link>
        </Button>
        <Forbidden to={[ERoles.TEACHER]} variant="invisible">
          <Button variant="destructive" onClick={() => console.log("eliminar")}>
            Eliminar
          </Button>
        </Forbidden>
      </CardFooter>
    </Card>
  );
}
