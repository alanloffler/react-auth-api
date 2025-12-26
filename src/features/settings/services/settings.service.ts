import type { IApiResponse } from "@core/interfaces/api-response.interface";
import type { ISetting } from "@settings/interfaces/setting.interface";
import { apiClient } from "@core/client/client";

class SettingsModuleService {
  private static instance: SettingsModuleService;

  public static getInstance(): SettingsModuleService {
    if (!SettingsModuleService.instance) {
      SettingsModuleService.instance = new SettingsModuleService();
    }

    return SettingsModuleService.instance;
  }

  public async findAll(): Promise<IApiResponse<ISetting[]>> {
    const response = await apiClient.get("/settings");
    return response.data;
  }

  public async findByModule(module: string): Promise<IApiResponse<ISetting[]>> {
    const response = await apiClient.get(`/settings/by-module/${module}`);
    return response.data;
  }

  public async update(id: string, value: string): Promise<IApiResponse<ISetting>> {
    const response = await apiClient.patch(`/settings/${id}`, { value });
    return response.data;
  }
}

export const SettingsService = SettingsModuleService.getInstance();
