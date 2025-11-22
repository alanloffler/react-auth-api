import { createBrowserRouter, RouterProvider } from "react-router";
import { Home } from "@/features/home/Home";
import { Login } from "@login/Login";
import { Toaster } from "@components/ui/sonner";
import { Users } from "@/features/users/Users";
import { Roles } from "./features/roles/Roles";
import { Dashboard } from "./features/dashboard/Dashboard";
// import { Roles } from "@/features/users/Users";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/home",
      element: <Home />,
      children: [
        {
          path: "/home",
          element: <Dashboard />,
        },
        {
          path: "/home/users",
          element: <Users />,
        },
        {
          path: "/home/roles",
          element: <Roles />,
        },
      ],
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
