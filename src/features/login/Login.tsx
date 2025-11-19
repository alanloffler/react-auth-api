import { LoginForm } from "./components/LoginForm";

export function Login() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center p-6 md:p-10 min-w-4xl">
      <div className="w-full h-full">
        <LoginForm />
      </div>
    </div>
  );
}
