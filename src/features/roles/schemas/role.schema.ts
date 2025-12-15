import z from "zod";

const actionSchema = z.object({
  deletedAt: z.string().optional().nullable(),
  id: z.string(),
  key: z.string(),
  name: z.string(),
  value: z.boolean(),
});

const permissionSchema = z.object({
  actions: z.array(actionSchema),
  id: z.string(),
  module: z.string(),
  name: z.string(),
});

export const roleSchema = z.object({
  description: z.string().nonempty("La descripción no puede estar vacía"),
  name: z.string().nonempty("El nombre no puede estar vacío"),
  permissions: z
    .array(permissionSchema)
    .refine(
      (perms) => perms.some((p) => p.actions.some((a) => a.value === true)),
      "Debe seleccionar al menos un permiso",
    ),
  value: z.string().nonempty("El valor no puede estar vacío"),
});
