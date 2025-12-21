import type { IAdmin } from "@admin/interfaces/admin.interface";
import type { IApiResponse } from "@core/interfaces/api-response.interface";
import { apiClient } from "@core/client/client";

class AccountModuleService {
  private static instance: AccountModuleService;

  public static getInstance(): AccountModuleService {
    if (!AccountModuleService.instance) {
      AccountModuleService.instance = new AccountModuleService();
    }

    return AccountModuleService.instance;
  }

  public async get(): Promise<IApiResponse<IAdmin>> {
    const response = await apiClient.get("/admin/profile");
    return response.data;
  }

  public async update(data: Partial<IAdmin>): Promise<IApiResponse<IAdmin>> {
    const response = await apiClient.patch("/admin/profile", data);
    return response.data;
  }
}

export const AccountService = AccountModuleService.getInstance();
