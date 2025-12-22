import { Eye, EyeOff } from "lucide-react";

import { BackButton } from "@components/BackButton";
import { Button } from "@components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@components/ui/card";
import { Controller } from "react-hook-form";
import { Field, FieldError, FieldGroup, FieldLabel } from "@components/ui/field";
import { Input } from "@components/ui/input";
import { Loader } from "@components/Loader";

import type z from "zod";
import { toast } from "sonner";
import { type MouseEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";

import { AccountService } from "@account/services/profile.service";
import { AdminService } from "@admin/services/admin.service";
import { profileSchema } from "@account/schemas/profile.schema";
import { useAuthStore } from "@auth/auth.store";
import { useTryCatch } from "@core/hooks/useTryCatch";

export default function Account() {
  const [icError, setIcError] = useState<string | null>(null);
  const [passwordField, setPasswordField] = useState<boolean>(true);
  const navigate = useNavigate();
  const ownAdmin = useAuthStore((state) => state.admin);
  const refreshAdmin = useAuthStore((state) => state.refreshAdmin);
  const { isLoading: isLoadingAdmin, tryCatch: tryCatchAdmin } = useTryCatch();
  const { isLoading: isSaving, tryCatch: tryCatchSubmit } = useTryCatch();

  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      email: "",
      firstName: "",
      ic: "",
      lastName: "",
      password: "",
      phoneNumber: "",
      userName: "",
    },
  });

  useEffect(() => {
    async function findOneWithCredentials(): Promise<void> {
      if (!ownAdmin) return;

      const [admin, adminError] = await tryCatchAdmin(AdminService.findOneWithCredentials(ownAdmin.id));

      if (adminError) {
        toast.error(adminError.message);
        return;
      }

      if (admin && admin.statusCode === 200) {
        if (admin.data)
          form.reset({
            email: admin.data.email,
            firstName: admin.data.firstName,
            ic: admin.data.ic,
            lastName: admin.data.lastName,
            password: "",
            phoneNumber: admin.data.phoneNumber,
            userName: admin.data.userName,
          });
      }
    }

    findOneWithCredentials();
  }, [form, ownAdmin, tryCatchAdmin]);

  function togglePasswordField(event: MouseEvent<HTMLButtonElement>): void {
    event.preventDefault();
    setPasswordField(!passwordField);
  }

  async function onSubmit(data: any): Promise<void> {
    if (icError) {
      form.setError("ic", { message: icError });
      return;
    }

    // Check again for race condition: before first check another admin use same ic
    const icAvailableResponse = await AdminService.checkIcAvailability(data.ic);

    if (icAvailableResponse.data === false) {
      const errorMsg = "DNI ya registrado";
      setIcError(errorMsg);
      form.setError("ic", { message: errorMsg });
      return;
    }

    const updateData = data.password
      ? data
      : Object.fromEntries(Object.entries(data).filter(([key]) => key !== "password"));
    const [update, updateError] = await tryCatchSubmit(AccountService.update(updateData));

    if (updateError) {
      toast.error(updateError.message);
      return;
    }

    if (update?.statusCode === 200) {
      toast.success("Perfil actualizado");
      await refreshAdmin();
    }
  }

  function handleCancel(): void {
    form.reset();
    navigate(-1);
  }

  return (
    <div className="flex w-full flex-col lg:w-[80%] xl:w-[60%]">
      <Card className="relative">
        <BackButton />
        <CardHeader>
          <CardTitle>Editar tu cuenta</CardTitle>
          <CardDescription>Actualizá los datos de tu perfil</CardDescription>
        </CardHeader>
        <CardContent className="flex-1">
          <form className="grid grid-cols-1 gap-6" id="edit-form" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup className="grid grid-cols-2 gap-6">
              <Field>
                <FieldLabel>ID</FieldLabel>
                <Input className="pointer-events-none" id="id" readOnly value={ownAdmin!.id} />
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
                      onChange={async (e) => {
                        const value = e.target.value.replace(/\D/g, "");
                        field.onChange(value);

                        setIcError(null);
                        form.clearErrors("ic");

                        if (value.length >= 7 && value !== ownAdmin?.ic) {
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
                    <FieldLabel htmlFor="password">Nueva Contraseña (opcional)</FieldLabel>
                    <div className="flex items-center gap-2">
                      <Input
                        aria-invalid={fieldState.invalid}
                        id="password"
                        type={passwordField ? "password" : "text"}
                        {...field}
                      />
                      <button
                        type="button"
                        className="p-1 transition-colors duration-150 hover:text-sky-500"
                        onClick={(e) => togglePasswordField(e)}
                      >
                        {passwordField ? <Eye className="h-5 w-5" /> : <EyeOff className="h-5 w-5" />}
                      </button>
                    </div>
                    {fieldState.invalid && true && <FieldError errors={[{ message: "fieldState.error" }]} />}
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
        <CardFooter className="flex items-center justify-between pt-4">
          <div>
            {isLoadingAdmin && <Loader className="text-sm" color="black" size={18} text="Cargando tu información" />}
          </div>
          <div className="flex gap-4">
            <Button variant="ghost" onClick={handleCancel}>
              Cancelar
            </Button>
            <Button disabled={!form.formState.isDirty} form="edit-form" type="submit" variant="default">
              {isSaving ? <Loader text="Guardando" /> : "Guardar"}
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
