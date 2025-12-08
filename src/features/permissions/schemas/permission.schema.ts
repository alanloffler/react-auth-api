import z from "zod";

export const permissionSchema = z.object({
  actionKey: z.string().nonempty("La acción no puede estar vacía"),
  category: z.string().nonempty("La categoría no puede estar vacía"),
  description: z.string().nonempty("La descripción no puede estar vacía"),
  name: z.string().nonempty("El nombre no puede estar vacío"),
});
