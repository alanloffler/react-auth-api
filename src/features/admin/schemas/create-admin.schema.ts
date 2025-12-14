import z from "zod";

import { adminSchema } from "@admin/schemas/admin.schema";

export const createAdminSchema = adminSchema.extend({
  password: z
    .string()
    .nonempty("La contraseña no puede estar vacía")
    .min(8, "La contraseña debe tener al menos 8 caracteres"),
});
