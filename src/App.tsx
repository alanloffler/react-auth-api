import CreateAdmin from "@admin/views/CreateAdmin";
import CreatePermission from "@permissions/views/CreatePermission";
import CreateRole from "@roles/views/CreateRole";
import EditAdmin from "@admin/views/EditAdmin";
import EditPermission from "@permissions/views/EditPermission";
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
          <ProtectedRoute requiredPermission="admin-view">
            <Admin />
          </ProtectedRoute>
        ),
      },
      {
        path: "admin/create",
        element: (
          <ProtectedRoute requiredPermission={["admin-view", "admin-create"]}>
            <CreateAdmin />
          </ProtectedRoute>
        ),
      },
      {
        path: "admin/edit/:id",
        element: (
          <ProtectedRoute requiredPermission={["admin-view", "admin-update"]}>
            <EditAdmin />
          </ProtectedRoute>
        ),
      },
      {
        path: "admin/view/:id",
        element: (
          <ProtectedRoute requiredPermission="admin-view">
            <ViewAdmin />
          </ProtectedRoute>
        ),
      },
      {
        path: "roles",
        element: (
          <ProtectedRoute requiredPermission="roles-view">
            <Roles />
          </ProtectedRoute>
        ),
      },
      {
        path: "roles/create",
        element: (
          <ProtectedRoute requiredPermission={["roles-view", "roles-create"]}>
            <CreateRole />
          </ProtectedRoute>
        ),
      },
      {
        path: "roles/edit/:id",
        element: (
          <ProtectedRoute requiredPermission={["roles-view", "roles-update"]}>
            <EditRole />
          </ProtectedRoute>
        ),
      },
      {
        path: "roles/view/:id",
        element: (
          <ProtectedRoute requiredPermission="roles-view">
            <ViewRole />
          </ProtectedRoute>
        ),
      },
      {
        path: "permissions",
        element: (
          <ProtectedRoute requiredPermission="permissions-view">
            <Permissions />
          </ProtectedRoute>
        ),
      },
      {
        path: "permissions/create",
        element: (
          <ProtectedRoute requiredPermission={["permissions-view", "permissions-create"]}>
            <CreatePermission />
          </ProtectedRoute>
        ),
      },
      {
        path: "permissions/edit/:id",
        element: (
          <ProtectedRoute requiredPermission={["permissions-view", "permissions-update"]}>
            <EditPermission />
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
