import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@components/ui/breadcrumb";
import { Link } from "react-router";

import { matchRoutes, useLocation } from "react-router";
import { useCallback, useEffect, useState } from "react";

const routes = [
  {
    path: "/dashboard",
    name: "Inicio",
  },
  {
    path: "/admin",
    name: "Administradores",
  },
  {
    path: "/admin/create",
    name: "Crear",
  },
  {
    path: "/admin/view/:id",
    name: "Ver",
  },
  {
    path: "/admin/edit/:id",
    name: "Editar",
  },
  {
    path: "/roles",
    name: "Roles",
  },
  {
    path: "/roles/create",
    name: "Crear",
  },
  {
    path: "/roles/view/:id",
    name: "Ver",
  },
  {
    path: "/roles/edit/:id",
    name: "Editar",
  },
  {
    path: "/permissions",
    name: "Permisos",
  },
  {
    path: "/permissions/create",
    name: "Crear",
  },
  {
    path: "/permissions/view/:id",
    name: "Ver",
  },
  {
    path: "/permissions/edit/:id",
    name: "Editar",
  },
  {
    path: "/app-settings",
    name: "Configuraciones de la aplicación",
  },
  {
    path: "/dashboard-settings",
    name: "Configuraciones del tablero",
  },
  {
    path: "/account",
    name: "Mi cuenta",
  },
  {
    path: "/404",
    name: "404",
  },
];

interface IBreadcrumb {
  name: string;
  path: string;
  isLast: boolean;
}

export function HeaderBreadcrumb() {
  const [crumbs, setCrumbs] = useState<IBreadcrumb[]>([]);
  const location = useLocation();

  const getPaths = useCallback(() => {
    const allRoutes = matchRoutes(routes, location);
    const matchedRoute = allRoutes ? allRoutes[0] : null;

    const breadcrumbs: IBreadcrumb[] = [];

    if (matchedRoute) {
      const filteredRoutes = routes.filter((x) => matchedRoute.route.path?.includes(x.path));

      filteredRoutes.forEach(({ path, name }) => {
        const realPath = Object.keys(matchedRoute.params).length
          ? Object.keys(matchedRoute.params).reduce(
              (acc, param) => acc.replace(`:${param}`, matchedRoute.params[param] as string),
              path,
            )
          : path;

        breadcrumbs.push({
          name,
          path: realPath,
          isLast: false,
        });
      });

      if (breadcrumbs.length > 0) {
        breadcrumbs[breadcrumbs.length - 1].isLast = true;
      }
    }

    setCrumbs(breadcrumbs);
  }, [location]);

  useEffect(() => {
    getPaths();
  }, [getPaths]);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {crumbs[0]?.path !== "/dashboard" && (
          <>
            <BreadcrumbLink href="/dashboard">Inicio</BreadcrumbLink>
            <BreadcrumbSeparator />
          </>
        )}
        {crumbs.map((crumb, index) => (
          <div key={index} className="contents">
            <BreadcrumbItem>
              {crumb.isLast ? (
                <BreadcrumbPage>{crumb.name}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink asChild>
                  <Link to={crumb.path}>{crumb.name}</Link>
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
            {!crumb.isLast && <BreadcrumbSeparator />}
          </div>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
