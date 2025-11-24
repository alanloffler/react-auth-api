import type { IAdmin } from "@admin/interfaces/admin.interface";
import type { IApiResponse } from "@core/interfaces/api-response.interface";
import { apiClient } from "@core/client/client";

class AdminModuleService {
  private static instance: AdminModuleService;

  public static getInstance(): AdminModuleService {
    if (!AdminModuleService.instance) {
      AdminModuleService.instance = new AdminModuleService();
    }

    return AdminModuleService.instance;
  }

  public async getAll(): Promise<IApiResponse<IAdmin[]>> {
    const response = await apiClient.get("/admin");
    return response.data;
  }

  public async remove(id: string): Promise<IApiResponse<any>> {
    const response = await apiClient.delete(`/admin/${id}`);
    return response.data;
  }
}

export const AdminService = AdminModuleService.getInstance();
