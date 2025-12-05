import CreateAdmin from "@/features/admin/views/CreateAdmin";
import CreateRol from "@/features/roles/views/CreateRol";
import { Admin } from "@admin/Admin";
import { AppInitializer } from "@core/auth/components/AppInitializer";
import { Dashboard } from "@/features/dashboard/Dashboard";
import { GuestRoute } from "@core/auth/components/GuestRoute";
import { Login } from "@login/Login";
import { ProtectedLayout } from "@core/auth/components/ProtectedLayout";
import { ProtectedRoute } from "@core/auth/components/ProtectedRoute";
import { Roles } from "@/features/roles/Roles";
import { Toaster } from "@components/ui/sonner";

import { createBrowserRouter, RouterProvider } from "react-router";

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
    path: "/",
    element: <ProtectedLayout />,
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "admin",
        element: (
          <ProtectedRoute allowedRoles={["superadmin", "admin"]}>
            <Admin />
          </ProtectedRoute>
        ),
      },
      {
        path: "admin/create",
        element: (
          <ProtectedRoute allowedRoles={["superadmin", "admin"]}>
            <CreateAdmin />
          </ProtectedRoute>
        ),
      },
      {
        path: "roles",
        element: (
          <ProtectedRoute allowedRoles={["superadmin", "admin"]}>
            <Roles />
          </ProtectedRoute>
        ),
      },
      {
        path: "roles/create",
        element: (
          <ProtectedRoute allowedRoles={["superadmin", "admin"]}>
            <CreateRol />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

export default function App() {
  return (
    <AppInitializer>
      <RouterProvider router={router} />
      <Toaster position="bottom-center" richColors theme="light" />
    </AppInitializer>
  );
}
