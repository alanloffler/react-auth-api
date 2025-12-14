import { z } from "zod";

const baseAdminSchema = z.object({
  email: z.email({ message: "Debes ingresar un email válido" }),
  firstName: z.string().nonempty("El nombre no puede estar vacío"),
  ic: z.string().nonempty("El número de DNI no puede estar vacío"),
  lastName: z.string().nonempty("El apellido no puede estar vacío"),
  phoneNumber: z.string().nonempty("El número de teléfono no puede estar vacío"),
  roleId: z.string().nonempty("El rol no puede estar vacío"),
  userName: z.string().nonempty("El nombre de usuario no puede estar vacío"),
});

export const createAdminSchema = baseAdminSchema.extend({
  password: z
    .string()
    .nonempty("La contraseña no puede estar vacía")
    .min(8, "La contraseña debe tener al menos 8 caracteres"),
});

export const updateAdminSchema = baseAdminSchema.extend({
  password: z
    .string()
    .optional()
    .refine((val) => !val || val.length >= 8, "La contraseña debe tener al menos 8 caracteres"),
});

export const adminSchema = createAdminSchema;
