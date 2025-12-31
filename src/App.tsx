import { createBrowserRouter, RouterProvider } from "react-router";
import { lazy, Suspense } from "react";

import { AppInitializer } from "@auth/components/AppInitializer";
import { GuestRoute } from "@auth/components/GuestRoute";
import { Login } from "@login/Login";
import { PageLoader } from "@components/PageLoader";
import { ProtectedLayout } from "@auth/components/ProtectedLayout";
import { ProtectedRoute } from "@auth/components/ProtectedRoute";
import { Toaster } from "@components/ui/sonner";

const Dashboard = lazy(() => import("./features/dashboard/Dashboard"));

const Admin = lazy(() => import("./features/admin/Admin"));
const CreateAdmin = lazy(() => import("./features/admin/views/CreateAdmin"));
const EditAdmin = lazy(() => import("./features/admin/views/EditAdmin"));
const ViewAdmin = lazy(() => import("./features/admin/views/ViewAdmin"));

const Roles = lazy(() => import("./features/roles/Roles"));
const CreateRole = lazy(() => import("./features/roles/views/CreateRole"));
const EditRole = lazy(() => import("./features/roles/views/EditRole"));
const ViewRole = lazy(() => import("./features/roles/views/ViewRole"));

const Permissions = lazy(() => import("./features/permissions/Permissions"));
const CreatePermission = lazy(() => import("./features/permissions/views/CreatePermission"));
const EditPermission = lazy(() => import("./features/permissions/views/EditPermission"));
const ViewPermission = lazy(() => import("./features/permissions/views/ViewPermission"));

const AppSettings = lazy(() => import("./features/settings/AppSettings"));
const DashboardSettings = lazy(() => import("./features/settings/DashboardSettings"));

const Account = lazy(() => import("./features/account/Account"));

const NotFound = lazy(() => import("./core/components/NotFound"));

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
        element: (
          <Suspense
            fallback={
              <div className="relative h-full w-full">
                <PageLoader className="-mt-8" />
              </div>
            }
          >
            <Dashboard />
          </Suspense>
        ),
      },
      {
        path: "admin",
        element: (
          <Suspense
            fallback={
              <div className="relative h-full w-full">
                <PageLoader className="-mt-8" />
              </div>
            }
          >
            <ProtectedRoute requiredPermission="admin-view">
              <Admin />
            </ProtectedRoute>
          </Suspense>
        ),
      },
      {
        path: "admin/create",
        element: (
          <Suspense
            fallback={
              <div className="relative h-full w-full">
                <PageLoader className="-mt-8" />
              </div>
            }
          >
            <ProtectedRoute requiredPermission={["admin-view", "admin-create"]}>
              <CreateAdmin />
            </ProtectedRoute>
          </Suspense>
        ),
      },
      {
        path: "admin/edit/:id",
        element: (
          <Suspense
            fallback={
              <div className="relative h-full w-full">
                <PageLoader className="-mt-8" />
              </div>
            }
          >
            <ProtectedRoute requiredPermission={["admin-view", "admin-update"]}>
              <EditAdmin />
            </ProtectedRoute>
          </Suspense>
        ),
      },
      {
        path: "admin/view/:id",
        element: (
          <Suspense
            fallback={
              <div className="relative h-full w-full">
                <PageLoader className="-mt-8" />
              </div>
            }
          >
            <ProtectedRoute requiredPermission="admin-view">
              <ViewAdmin />
            </ProtectedRoute>
          </Suspense>
        ),
      },
      {
        path: "roles",
        element: (
          <Suspense
            fallback={
              <div className="relative h-full w-full">
                <PageLoader className="-mt-8" />
              </div>
            }
          >
            <ProtectedRoute requiredPermission="roles-view">
              <Roles />
            </ProtectedRoute>
          </Suspense>
        ),
      },
      {
        path: "roles/create",
        element: (
          <Suspense
            fallback={
              <div className="relative h-full w-full">
                <PageLoader className="-mt-8" />
              </div>
            }
          >
            <ProtectedRoute requiredPermission={["roles-view", "roles-create"]}>
              <CreateRole />
            </ProtectedRoute>
          </Suspense>
        ),
      },
      {
        path: "roles/edit/:id",
        element: (
          <Suspense
            fallback={
              <div className="relative h-full w-full">
                <PageLoader className="-mt-8" />
              </div>
            }
          >
            <ProtectedRoute requiredPermission={["roles-view", "roles-update"]}>
              <EditRole />
            </ProtectedRoute>
          </Suspense>
        ),
      },
      {
        path: "roles/view/:id",
        element: (
          <Suspense
            fallback={
              <div className="relative h-full w-full">
                <PageLoader className="-mt-8" />
              </div>
            }
          >
            <ProtectedRoute requiredPermission="roles-view">
              <ViewRole />
            </ProtectedRoute>
          </Suspense>
        ),
      },
      {
        path: "permissions",
        element: (
          <Suspense
            fallback={
              <div className="relative h-full w-full">
                <PageLoader className="-mt-8" />
              </div>
            }
          >
            <ProtectedRoute requiredPermission="permissions-view">
              <Permissions />
            </ProtectedRoute>
          </Suspense>
        ),
      },
      {
        path: "permissions/create",
        element: (
          <Suspense
            fallback={
              <div className="relative h-full w-full">
                <PageLoader className="-mt-8" />
              </div>
            }
          >
            <ProtectedRoute requiredPermission={["permissions-view", "permissions-create"]}>
              <CreatePermission />
            </ProtectedRoute>
          </Suspense>
        ),
      },
      {
        path: "permissions/edit/:id",
        element: (
          <Suspense
            fallback={
              <div className="relative h-full w-full">
                <PageLoader className="-mt-8" />
              </div>
            }
          >
            <ProtectedRoute requiredPermission={["permissions-view", "permissions-update"]}>
              <EditPermission />
            </ProtectedRoute>
          </Suspense>
        ),
      },
      {
        path: "permissions/view/:id",
        element: (
          <Suspense
            fallback={
              <div className="relative h-full w-full">
                <PageLoader className="-mt-8" />
              </div>
            }
          >
            <ProtectedRoute requiredPermission="permissions-view">
              <ViewPermission />
            </ProtectedRoute>
          </Suspense>
        ),
      },
      {
        path: "app-settings",
        element: (
          <Suspense
            fallback={
              <div className="relative h-full w-full">
                <PageLoader className="-mt-8" />
              </div>
            }
          >
            <ProtectedRoute requiredPermission="settings-view">
              <AppSettings />
            </ProtectedRoute>
          </Suspense>
        ),
      },
      {
        path: "dashboard-settings",
        element: (
          <Suspense
            fallback={
              <div className="relative h-full w-full">
                <PageLoader className="-mt-8" />
              </div>
            }
          >
            <ProtectedRoute requiredPermission="settings-view">
              <DashboardSettings />
            </ProtectedRoute>
          </Suspense>
        ),
      },
      {
        path: "account",
        element: (
          <Suspense
            fallback={
              <div className="relative h-full w-full">
                <PageLoader className="-mt-8" />
              </div>
            }
          >
            <Account />
          </Suspense>
        ),
      },
      {
        path: "*",
        element: (
          <Suspense
            fallback={
              <div className="relative h-full w-full">
                <PageLoader className="-mt-8" />
              </div>
            }
          >
            <NotFound />
          </Suspense>
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
