import { Button } from "@components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@components/ui/card";
import { Controller } from "react-hook-form";
import { Field, FieldError, FieldGroup, FieldLabel } from "@components/ui/field";
import { Input } from "@components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@components/ui/select";

import axios from "axios";
import type { IRole } from "@/features/roles/interfaces/role.interface";
import z from "zod";
import { AdminService } from "@admin/services/admin.service";
import { RolesService } from "@/features/roles/services/roles.service";
import { adminSchema } from "@admin/schemas/admin.schema";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

interface IProps {
  adminId: string;
}

export function EditForm({ adminId }: IProps) {
  const [roles, setRoles] = useState<IRole[] | undefined>(undefined);

  const form = useForm<z.infer<typeof adminSchema>>({
    resolver: zodResolver(adminSchema),
    defaultValues: {
      ic: "",
      userName: "",
      password: "",
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      roleId: "",
    },
  });

  useEffect(() => {
    async function findOneWithCredentials() {
      try {
        const response = await AdminService.findOneWithCredentials(adminId);

        if (response.statusCode === 200) {
          if (response.data)
            form.reset({
              ic: response.data.ic,
              userName: response.data.userName,
              password: response.data.password,
              firstName: response.data.firstName,
              lastName: response.data.lastName,
              email: response.data.email,
              phoneNumber: response.data.phoneNumber,
              roleId: response.data.roleId,
            });
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const message: string = error.response?.data?.message;
          form.control.setError("roleId", { message: "Error obteniendo" });

          if (message) {
            toast.error(message);
          } else {
            toast.error("Error desconocido en el servidor");
          }
        }
      }
    }

    findOneWithCredentials();
  }, [adminId, form]);

  async function onSubmit(data: z.infer<typeof adminSchema>) {
    try {
      const response = await AdminService.update(adminId, data);
      if (response.statusCode === 200) toast.success(response.message);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message: string = error.response?.data?.message;

        if (message) {
          toast.error(message);
        } else {
          toast.error("Error desconocido en el servidor");
        }
      }
    }
  }

  function resetForm(): void {
    form.reset();
  }

  useEffect(() => {
    async function getRoles() {
      try {
        const response = await RolesService.findAll();

        if (response.statusCode === 200) {
          setRoles(response.data);
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const message: string = error.response?.data?.message;

          form.control.setError("roleId", { message: "Error obteniendo" });

          if (message) {
            toast.error(message);
          } else {
            toast.error("Error desconocido en el servidor");
          }
        }
      }
    }

    getRoles();
  }, [form.control]);

  return (
    <Card className="w-1/2">
      <CardHeader>
        <CardTitle>Editar Administrador</CardTitle>
        <CardDescription>Aquí puedes editar los datos del administrador</CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <form className="grid grid-cols-1 gap-6" id="edit-form" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup className="grid grid-cols-2 gap-6">
            <Field>
              <FieldLabel>ID</FieldLabel>
              <Input className="pointer-events-none" id="id" readOnly value={adminId} />
            </Field>
            <Controller
              name="ic"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="ic">DNI</FieldLabel>
                  <Input
                    aria-invalid={fieldState.invalid}
                    id="ic"
                    {...field}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, "");
                      field.onChange(value);
                    }}
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
          </FieldGroup>
          <FieldGroup className="grid grid-cols-2 gap-6">
            <Controller
              name="userName"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="userName">Usuario</FieldLabel>
                  <Input aria-invalid={fieldState.invalid} id="userName" {...field} />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="password">Contraseña</FieldLabel>
                  <Input aria-invalid={fieldState.invalid} id="password" {...field} />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
          </FieldGroup>
          <FieldGroup className="grid grid-cols-2 gap-6">
            <Controller
              name="firstName"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="firstName">Nombre</FieldLabel>
                  <Input aria-invalid={fieldState.invalid} id="firstName" {...field} />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
            <Controller
              name="lastName"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="lastName">Apellido</FieldLabel>
                  <Input aria-invalid={fieldState.invalid} id="lastName" {...field} />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
          </FieldGroup>
          <FieldGroup className="grid grid-cols-3 gap-6">
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="col-span-2">
                  <FieldLabel htmlFor="email">E-mail</FieldLabel>
                  <Input aria-invalid={fieldState.invalid} id="email" {...field} />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
            <Controller
              name="roleId"
              control={form.control}
              render={({ field, fieldState }) => {
                return (
                  <Field data-invalid={fieldState.invalid} className="col-span-1">
                    <FieldLabel htmlFor="roleId">Rol</FieldLabel>
                    <Select disabled={!roles} key={field.value} value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger id="roleId" aria-invalid={fieldState.invalid}>
                        <SelectValue placeholder="Seleccione" />
                      </SelectTrigger>
                      <SelectContent>
                        {roles?.map((role) => (
                          <SelectItem key={role.id} value={role.id}>
                            {role.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                );
              }}
            />
          </FieldGroup>
          <FieldGroup className="grid grid-cols-3 gap-6">
            <Controller
              name="phoneNumber"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="col-span-2">
                  <FieldLabel htmlFor="phone">Teléfono</FieldLabel>
                  <Input
                    aria-invalid={fieldState.invalid}
                    {...field}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, "");
                      field.onChange(value);
                    }}
                    id="phone"
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter className="justify-end gap-4 pt-4">
        <Button variant="ghost" onClick={resetForm}>
          Cancelar
        </Button>
        <Button disabled={!form.formState.isDirty} form="edit-form" type="submit" variant="default">
          Guardar
        </Button>
      </CardFooter>
    </Card>
  );
}
