import { useMemo } from "react";

import type { TPermission } from "@permissions/interfaces/permission.type";
import { useAuthStore } from "@auth/stores/auth.store";

export function usePermission(actionKey: TPermission): boolean;

export function usePermission(actionKey: TPermission[], type: "every" | "some"): boolean;

export function usePermission(actionKey: TPermission | TPermission[], type?: "every" | "some"): boolean {
  const admin = useAuthStore((state) => state.admin);

  return useMemo(() => {
    if (!admin?.role?.rolePermissions) return false;

    const userPermissions = admin.role.rolePermissions
      .filter((rp) => rp.permission !== null)
      .map((rp) => rp.permission?.actionKey);

    if (Array.isArray(actionKey)) {
      if (type === "every") {
        return actionKey.every((key) => userPermissions.includes(key));
      }

      return actionKey.some((key) => userPermissions.includes(key));
    }

    return userPermissions.includes(actionKey);
  }, [admin, actionKey, type]);
}
