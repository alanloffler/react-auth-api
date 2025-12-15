import { useMemo } from "react";
import { useAuthStore } from "@auth/auth.store";

export function usePermission(actionKey: string): boolean;

export function usePermission(actionKey: string[], type: "every" | "some"): boolean;

export function usePermission(actionKey: string | string[], type?: "every" | "some"): boolean {
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
