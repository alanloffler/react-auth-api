import type { IApiResponse } from "@core/interfaces/api-response.interface";
import type { IRole } from "@roles/interfaces/role.interface";
import { apiClient } from "@core/client/client";

class RolesModuleService {
  private static instance: RolesModuleService;

  public static getInstance(): RolesModuleService {
    if (!RolesModuleService.instance) {
      RolesModuleService.instance = new RolesModuleService();
    }

    return RolesModuleService.instance;
  }

  public async findAll(): Promise<IApiResponse<IRole[]>> {
    const response = await apiClient.get("/roles");
    return response.data;
  }
}

export const RolesService = RolesModuleService.getInstance();
