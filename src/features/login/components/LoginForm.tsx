import { Button } from "@components/ui/button";
import { Card, CardContent } from "@components/ui/card";
import { Controller } from "react-hook-form";
import { Field, FieldError, FieldGroup, FieldLabel } from "@components/ui/field";
import { Input } from "@components/ui/input";
import { Loader } from "@components/Loader";

import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { AuthService } from "@auth/services/auth.service";
import { cn } from "@lib/utils";
import { loginSchema } from "@login/schemas/login.schema";
import { useAuthStore } from "@auth/stores/auth.store";
import { useTryCatch } from "@core/hooks/useTryCatch";

export function LoginForm({ className, ...props }: React.ComponentProps<"div">) {
  const navigate = useNavigate();
  const { isLoading: isFetching, tryCatch: tryCatchAdmin } = useTryCatch();
  const { isLoading: isLogin, tryCatch: tryCatchSubmit } = useTryCatch();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof loginSchema>) {
    const { email, password } = data;
    const [loginResponse, loginError] = await tryCatchSubmit(AuthService.signIn({ email, password }));

    if (loginError) {
      toast.error(loginError.message);
    }

    if (loginResponse && loginResponse.statusCode === 200) {
      const [adminResponse, adminError] = await tryCatchAdmin(AuthService.getAdmin());

      if (adminError) {
        toast.error(adminError.message);
      }

      if (adminResponse && adminResponse.statusCode === 200) {
        useAuthStore.getState().setAdmin(adminResponse.data);
        toast.success(`Bienvenido ${adminResponse.data?.firstName} ${adminResponse.data?.lastName}`);
        navigate("/dashboard");
      }
    }
  }

  return (
    <div className={cn("flex w-full flex-col gap-6", className)} {...props}>
      <Card className="mx-auto w-full max-w-6xl overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8 lg:p-10" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <div className="mb-6 flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold md:text-3xl">React Auth API</h1>
                <p className="text-muted-foreground text-sm text-balance md:text-base">Ingresá al sistema</p>
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
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="password">Contraseña</FieldLabel>
                    <Input
                      {...field}
                      aria-invalid={fieldState.invalid}
                      id="password"
                      className="h-11 md:h-12"
                      type="password"
                    />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
              <Field>
                <Button type="submit" className="h-11 w-full md:h-12">
                  {isLogin ? (
                    <Loader color="white" text="Ingresando" />
                  ) : isFetching ? (
                    <Loader color="white" text="Cargando" />
                  ) : (
                    "Ingresar"
                  )}
                </Button>
              </Field>
              <a href="#" className="text-xs underline-offset-2 hover:underline md:text-xs">
                ¿Olvidaste tu contraseña?
              </a>
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
