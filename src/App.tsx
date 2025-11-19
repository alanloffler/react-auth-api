import { createBrowserRouter, RouterProvider } from "react-router";
import { Home } from "@/features/home/Home";
import { Login } from "@login/Login";
import { Toaster } from "@components/ui/sonner";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/home",
      element: <Home />,
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
      <Toaster position="bottom-center" richColors theme="light" />
    </>
  );
}

export default App;
