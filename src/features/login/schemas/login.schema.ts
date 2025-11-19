import { z } from "zod";

export const loginSchema = z.object({
  email: z.email({ message: "Debes ingresar un email válido" }),
  password: z
    .string()
    .nonempty("La contraseña no puede estar vacía")
    .min(8, "La contraseña debe tener al menos 8 caracteres"),
});
