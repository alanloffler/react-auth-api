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

  public async create(data: Partial<IAdmin>): Promise<IApiResponse<IAdmin>> {
    const response = await apiClient.post("/admin", data);
    return response.data;
  }

  public async findAll(): Promise<IApiResponse<IAdmin[]>> {
    const response = await apiClient.get("/admin");
    return response.data;
  }

  public async findAllSoftRemoved(): Promise<IApiResponse<IAdmin[]>> {
    const response = await apiClient.get("/admin/soft-removed");
    return response.data;
  }

  public async findOne(id: string): Promise<IApiResponse<IAdmin>> {
    const response = await apiClient.get(`/admin/${id}`);
    return response.data;
  }

  public async findOneSoftRemoved(id: string): Promise<IApiResponse<IAdmin>> {
    const response = await apiClient.get(`/admin/${id}/soft-removed`);
    return response.data;
  }

  public async findOneWithCredentials(id: string): Promise<IApiResponse<IAdmin>> {
    const response = await apiClient.get(`/admin/${id}/credentials`);
    return response.data;
  }

  public async update(id: string, data: Partial<IAdmin>): Promise<IApiResponse<IAdmin>> {
    const response = await apiClient.patch(`/admin/${id}`, data);
    return response.data;
  }

  public async remove(id: string): Promise<IApiResponse<any>> {
    const response = await apiClient.delete(`/admin/${id}`);
    return response.data;
  }

  public async softRemove(id: string): Promise<IApiResponse<any>> {
    const response = await apiClient.delete(`/admin/soft-remove/${id}`);
    return response.data;
  }

  public async restore(id: string): Promise<IApiResponse<any>> {
    const response = await apiClient.patch(`/admin/restore/${id}`);
    return response.data;
  }

  public async checkEmailAvailability(email: string): Promise<IApiResponse<boolean>> {
    const response = await apiClient.get(`/admin/email-availability/${email}`);
    return response.data;
  }

  public async checkIcAvailability(id: string): Promise<IApiResponse<boolean>> {
    const response = await apiClient.get(`/admin/ic-availability/${id}`);
    return response.data;
  }

  public async checkUsernameAvailability(username: string): Promise<IApiResponse<boolean>> {
    const response = await apiClient.get(`/admin/username-availability/${username}`);
    return response.data;
  }
}

export const AdminService = AdminModuleService.getInstance();
