import { Admin } from "@admin/Admin";
import { Dashboard } from "@/features/dashboard/Dashboard";
import { GuestRoute } from "@core/auth/components/GuestRoute";
import { Home } from "@/features/home/Home";
import { Login } from "@login/Login";
import { Roles } from "@/features/roles/Roles";
import { Toaster } from "@components/ui/sonner";
// import { Roles } from "@/features/users/Users";

import { createBrowserRouter, RouterProvider } from "react-router";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <GuestRoute>
          <Login />
        </GuestRoute>
      ),
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
          path: "/home/admin",
          element: <Admin />,
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
