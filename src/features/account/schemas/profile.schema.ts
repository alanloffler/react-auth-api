import { z } from "zod";

export const profileSchema = z.object({
  email: z.email({ message: "Debes ingresar un email válido" }),
  firstName: z.string().nonempty("El nombre no puede estar vacío"),
  ic: z.string().nonempty("El número de DNI no puede estar vacío"),
  lastName: z.string().nonempty("El apellido no puede estar vacío"),
  password: z
    .string()
    .optional()
    .refine((val) => !val || val.length >= 8, "La contraseña debe tener al menos 8 caracteres"),
  phoneNumber: z.string().nonempty("El número de teléfono no puede estar vacío"),
  userName: z.string().nonempty("El nombre de usuario no puede estar vacío"),
});
