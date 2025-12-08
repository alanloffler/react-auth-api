import { Button } from "@components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@components/ui/card";
import { Controller } from "react-hook-form";
import { Field, FieldError, FieldGroup, FieldLabel } from "@components/ui/field";
import { Input } from "@components/ui/input";

import type z from "zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";

import { roleSchema } from "@roles/schemas/role.schema";

export default function CreateRol() {
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof roleSchema>>({
    resolver: zodResolver(roleSchema),
    defaultValues: {
      description: "",
      name: "",
      value: "",
    },
  });

  async function onSubmit(data: z.infer<typeof roleSchema>) {
    console.log(data);
  }

  function resetForm(): void {
    form.reset();
    navigate("/roles");
  }

  return (
    <div>
      <Card className="w-full lg:w-[80%] xl:w-[60%]">
        <CardHeader>
          <CardTitle>Nuevo Rol</CardTitle>
          <CardDescription>Creá un rol para los usuarios del sistema</CardDescription>
        </CardHeader>
        <CardContent className="flex-1">
          <form className="grid grid-cols-1 gap-6" id="create-role" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup className="grid grid-cols-2 gap-6">
              <Controller
                name="name"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="name">Nombre</FieldLabel>
                    <Input aria-invalid={fieldState.invalid} id="name" {...field} />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
              <Controller
                name="value"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="value">Valor</FieldLabel>
                    <Input aria-invalid={fieldState.invalid} id="value" {...field} />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
            </FieldGroup>
            <FieldGroup className="grid grid-cols-1 gap-6">
              <Controller
                name="description"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="description">Descripción</FieldLabel>
                    <Input aria-invalid={fieldState.invalid} id="description" {...field} />
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
          <Button disabled={!form.formState.isDirty} form="create-role" type="submit" variant="default">
            Guardar
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
