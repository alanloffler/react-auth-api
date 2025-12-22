import { z } from "zod";

export const adminSchema = z.object({
  email: z.email({ message: "Debes ingresar un email válido" }),
  firstName: z.string().nonempty("El nombre no puede estar vacío"),
  ic: z
    .string()
    .nonempty("El número de DNI no puede estar vacío")
    .max(8, "Máximo 8 dígitos")
    .min(8, "Mínimo 8 dígitos"),
  lastName: z.string().nonempty("El apellido no puede estar vacío"),
  phoneNumber: z.string().nonempty("El número de teléfono no puede estar vacío"),
  roleId: z.string().nonempty("El rol no puede estar vacío"),
  userName: z
    .string()
    .min(2, "El nombre de usuario no puede estar vacío")
    .regex(/^@.{3,}$/, { message: "Mínimo 3 caracteres" }),
});
