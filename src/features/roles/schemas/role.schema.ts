import { z } from "zod";

export const roleSchema = z.object({
  description: z.string().nonempty("La descripción no puede estar vacía"),
  name: z.string().nonempty("El nombre no puede estar vacío"),
  value: z.string().nonempty("El valor no puede estar vacío"),
});
