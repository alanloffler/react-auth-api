import type { IAdmin } from "@admin/interfaces/admin.interface";
import type { IPermission } from "@permissions/interfaces/permission.interface";

export interface IRole {
  admins: Pick<IAdmin, "id" | "firstName" | "lastName" | "userName">[];
  createdAt: string;
  deletedAt?: string;
  description: string;
  id: string;
  name: string;
  rolePermissions?: IRolePermissions[];
  value: string;
}

export interface IRolePermissions {
  roleId: string;
  permissionId: string;
  permission: IPermission | null;
}
