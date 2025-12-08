import type { IApiResponse } from "@core/interfaces/api-response.interface";
import type { IPermission } from "@permissions/interfaces/permission.interface";
import { apiClient } from "@core/client/client";

class PermissionsModuleService {
  private static instance: PermissionsModuleService;

  public static getInstance(): PermissionsModuleService {
    if (!PermissionsModuleService.instance) {
      PermissionsModuleService.instance = new PermissionsModuleService();
    }

    return PermissionsModuleService.instance;
  }

  public async create(permission: Partial<IPermission>): Promise<IApiResponse<IPermission>> {
    const response = await apiClient.post("/permissions", permission);
    return response.data;
  }

  public async findAll(): Promise<IApiResponse<IPermission[]>> {
    const response = await apiClient.get("/permissions");
    return response.data;
  }

  public async findAllGrouped(): Promise<IApiResponse<any[]>> {
    const response = await apiClient.get("/permissions/grouped");
    return response.data;
  }
}

export const PermissionsService = PermissionsModuleService.getInstance();
