import z from "zod";

import { adminSchema } from "@admin/schemas/admin.schema";

export const updateAdminSchema = adminSchema.extend({
  password: z
    .string()
    .optional()
    .refine((val) => !val || val.length >= 8, "La contraseña debe tener al menos 8 caracteres"),
});
