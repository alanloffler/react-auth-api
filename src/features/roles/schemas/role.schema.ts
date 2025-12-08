import z from "zod";

const actionSchema = z.object({
  id: z.number(),
  name: z.string(),
  key: z.string(),
  value: z.boolean(),
});

const permissionSchema = z.object({
  id: z.number(),
  name: z.string(),
  module: z.string(),
  actions: z.array(actionSchema),
});

export const roleSchema = z.object({
  description: z.string().nonempty("La descripción no puede estar vacía"),
  name: z.string().nonempty("El nombre no puede estar vacío"),
  value: z.string().nonempty("El valor no puede estar vacío"),
  permissions: z
    .array(permissionSchema)
    .refine(
      (perms) => perms.some((p) => p.actions.some((a) => a.value === true)),
      "Debe seleccionar al menos un permiso",
    ),
});
