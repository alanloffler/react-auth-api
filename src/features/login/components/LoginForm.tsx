import { Button } from "@components/ui/button";
import { Card, CardContent } from "@components/ui/card";
import { Controller } from "react-hook-form";
import { Field, FieldError, FieldGroup, FieldLabel } from "@components/ui/field";
import { Input } from "@components/ui/input";
import axios from "axios";
import { AuthAPI } from "@core/auth/auth.service";
import { cn } from "@lib/utils";
import { loginSchema } from "@login/schemas/login.schema";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export function LoginForm({ className, ...props }: React.ComponentProps<"div">) {
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof loginSchema>) {
    const { email, password } = data;

    try {
      const response = await AuthAPI.signIn({ email, password });
      toast.success(`Bienvenido ${response.data?.email}`);

      navigate("/home");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message: string = error.response?.data?.message;

        if (message) {
          toast.error(message);
        } else {
          toast.error("Error desconocido en el servidor");
        }
      }
    }
  }

  return (
    <div className={cn("flex flex-col gap-6 w-full", className)} {...props}>
      <Card className="overflow-hidden p-0 w-full max-w-6xl mx-auto">
        <CardContent className="grid p-0 md:grid-cols-2">
          {/* Formulario */}
          <form className="p-6 md:p-8 lg:p-10" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <div className="flex flex-col items-center gap-2 text-center mb-6">
                <h1 className="text-2xl md:text-3xl font-bold">React Auth API</h1>
                <p className="text-muted-foreground text-balance text-sm md:text-base">Ingresá a nuestro sistema</p>
              </div>
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <Input {...field} aria-invalid={fieldState.invalid} className="h-11 md:h-12" id="email" />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field aria-invalid={fieldState.invalid}>
                    <div className="flex items-center justify-between">
                      <FieldLabel htmlFor="password">Contraseña</FieldLabel>
                      <a href="#" className="text-xs md:text-sm underline-offset-2 hover:underline">
                        ¿Olvidaste tu contraseña?
                      </a>
                    </div>
                    <Input
                      {...field}
                      aria-invalid={fieldState.invalid}
                      id="password"
                      className="h-11 md:h-12"
                      type="password"
                    />
                    {fieldState.error && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
              <Field>
                <Button type="submit" className="w-full h-11 md:h-12">
                  Ingresar
                </Button>
              </Field>
            </FieldGroup>
          </form>
          <div className="bg-muted relative hidden md:block">
            <img
              src="/login.webp"
              alt="Login"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
