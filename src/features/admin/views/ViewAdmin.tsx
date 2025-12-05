import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { tryCatch } from "@/core/utils/try-catch";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { AdminService } from "../services/admin.service";
import type { IAdmin } from "../interfaces/admin.interface";
import { toast } from "sonner";

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
    <Card className="w-full lg:w-[80%] xl:w-[60%]">
      <CardHeader>
        <CardTitle className="text-lg">{`${admin?.firstName} ${admin?.lastName}`}</CardTitle>
        <CardDescription>{admin?.role.name}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <ul>
          <li className="flex gap-2">
            <span className="font-bold">DNI</span>
            <span>{admin?.ic}</span>
          </li>
          <li className="flex gap-2">
            <span className="font-bold">E-mail</span>
            <span>{admin?.email}</span>
          </li>
          <li className="flex gap-2">
            <span className="font-bold">Telefono</span>
            <span>{admin?.email}</span>
          </li>
        </ul>
      </CardContent>
    </Card>
  );
}
