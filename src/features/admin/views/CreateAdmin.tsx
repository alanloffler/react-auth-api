import { Button } from "@components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@components/ui/card";
import { Controller } from "react-hook-form";
import { Field, FieldError, FieldGroup, FieldLabel } from "@components/ui/field";
import { Input } from "@components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@components/ui/select";

import z from "zod";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import type { IRole } from "@/features/roles/interfaces/role.interface";
import { AdminService } from "@admin/services/admin.service";
import { RolesService } from "@/features/roles/services/roles.service";
import { adminSchema } from "@admin/schemas/admin.schema";
import { tryCatch } from "@/core/utils/try-catch";
import { useNavigate } from "react-router";

export default function CreateAdmin() {
  const [icError, setIcError] = useState<string | null>(null);
  const [roles, setRoles] = useState<IRole[] | undefined>(undefined);
  const navigate = useNavigate();

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

  async function onSubmit(data: z.infer<typeof adminSchema>) {
    if (icError) {
      form.setError("ic", { message: icError });
      return;
    }

    const icAvailableResponse = await AdminService.checkIcAvailability(data.ic);

    if (icAvailableResponse.data === false) {
      const errorMsg = "DNI ya registrado";
      setIcError(errorMsg);
      form.setError("ic", { message: errorMsg });

      return;
    }

    const [create, createError] = await tryCatch(AdminService.create(data));

    if (createError) {
      toast.error(createError.message);

      return;
    }

    if (create?.statusCode === 201) {
      toast.success(create.message);
      navigate("/admin");
    }
  }

  function resetForm(): void {
    form.reset();
    navigate("/admin");
  }

  useEffect(() => {
    async function getRoles() {
      const [roles, rolesError] = await tryCatch(RolesService.findAll());

      if (rolesError) {
        toast.error(rolesError.message);
        form.control.setError("roleId", { message: "Error obteniendo roles" });

        return;
      }

      if (roles?.statusCode === 200) {
        setRoles(roles?.data);
      }
    }

    getRoles();
  }, [form.control]);

  return (
    <div>
      <Card className="w-full lg:w-[80%] xl:w-[60%]">
        <CardHeader>
          <CardTitle>Nuevo Administrador</CardTitle>
          <CardDescription>Aquí puedes editar los datos del administrador</CardDescription>
        </CardHeader>
        <CardContent className="flex-1">
          <form className="grid grid-cols-1 gap-6" id="create-admin" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup className="grid grid-cols-2 gap-6">
              <Controller
                name="ic"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid || !!icError}>
                    <FieldLabel htmlFor="ic">DNI</FieldLabel>
                    <Input
                      aria-invalid={fieldState.invalid || !!icError}
                      id="ic"
                      {...field}
                      onChange={async (e) => {
                        const value = e.target.value.replace(/\D/g, "");
                        field.onChange(value);

                        setIcError(null);
                        form.clearErrors("ic");

                        if (value.length > 0) {
                          const response = await AdminService.checkIcAvailability(value);
                          if (response.data === false) {
                            const errorMsg = "DNI ya registrado";
                            setIcError(errorMsg);
                            form.setError("ic", { message: errorMsg });
                          }
                        }
                      }}
                    />
                    {(fieldState.invalid || icError) && (
                      <FieldError errors={icError ? [{ message: icError }] : [fieldState.error]} />
                    )}
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
            <FieldGroup className="grid grid-cols-5 gap-6">
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid} className="col-span-3">
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
                    <Field data-invalid={fieldState.invalid} className="col-span-2">
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
            <FieldGroup className="grid grid-cols-2 gap-6">
              <Controller
                name="phoneNumber"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid} className="col-span-1">
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
          <Button disabled={!form.formState.isDirty} form="create-admin" type="submit" variant="default">
            Guardar
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
