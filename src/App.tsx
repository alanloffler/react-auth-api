import CreateAdmin from "@admin/views/CreateAdmin";
import CreatePermission from "@permissions/views/CreatePermission";
import CreateRole from "@roles/views/CreateRole";
import EditAdmin from "@admin/views/EditAdmin";
import EditRole from "@roles/views/EditRole";
import Permissions from "@permissions/Permissions";
import Roles from "@roles/Roles";
import ViewAdmin from "@admin/views/ViewAdmin";
import ViewRole from "@roles/views/ViewRole";
import { Admin } from "@admin/Admin";
import { AppInitializer } from "@auth/components/AppInitializer";
import { Dashboard } from "@dashboard/Dashboard";
import { GuestRoute } from "@auth/components/GuestRoute";
import { Login } from "@login/Login";
import { ProtectedLayout } from "@auth/components/ProtectedLayout";
import { ProtectedRoute } from "@auth/components/ProtectedRoute";
import { Toaster } from "@components/ui/sonner";

import { ERoles } from "@auth/enums/role.enum";
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
          <ProtectedRoute allowedRoles={[ERoles.SUPER, ERoles.ADMIN, ERoles.TEACHER]}>
            <Admin />
          </ProtectedRoute>
        ),
      },
      {
        path: "admin/create",
        element: (
          <ProtectedRoute allowedRoles={[ERoles.SUPER, ERoles.ADMIN]}>
            <CreateAdmin />
          </ProtectedRoute>
        ),
      },
      {
        path: "admin/edit/:id",
        element: (
          <ProtectedRoute allowedRoles={[ERoles.SUPER, ERoles.ADMIN]}>
            <EditAdmin />
          </ProtectedRoute>
        ),
      },
      {
        path: "admin/view/:id",
        element: (
          <ProtectedRoute allowedRoles={[ERoles.SUPER, ERoles.ADMIN, ERoles.TEACHER]}>
            <ViewAdmin />
          </ProtectedRoute>
        ),
      },
      {
        path: "roles",
        element: (
          <ProtectedRoute allowedRoles={[ERoles.SUPER, ERoles.ADMIN]}>
            <Roles />
          </ProtectedRoute>
        ),
      },
      {
        path: "roles/create",
        element: (
          <ProtectedRoute allowedRoles={[ERoles.SUPER, ERoles.ADMIN]}>
            <CreateRole />
          </ProtectedRoute>
        ),
      },
      {
        path: "roles/edit/:id",
        element: (
          <ProtectedRoute allowedRoles={[ERoles.SUPER, ERoles.ADMIN]}>
            <EditRole />
          </ProtectedRoute>
        ),
      },
      {
        path: "roles/view/:id",
        element: (
          <ProtectedRoute allowedRoles={[ERoles.SUPER, ERoles.ADMIN, ERoles.TEACHER]}>
            <ViewRole />
          </ProtectedRoute>
        ),
      },
      {
        path: "permissions",
        element: (
          <ProtectedRoute allowedRoles={[ERoles.SUPER, ERoles.ADMIN]}>
            <Permissions />
          </ProtectedRoute>
        ),
      },
      {
        path: "permissions/create",
        element: (
          <ProtectedRoute allowedRoles={[ERoles.SUPER, ERoles.ADMIN]}>
            <CreatePermission />
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
