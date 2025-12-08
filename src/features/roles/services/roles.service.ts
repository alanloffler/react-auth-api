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

  public async create(role: Partial<IRole>): Promise<IApiResponse<IRole>> {
    const response = await apiClient.post("/roles", role);
    return response.data;
  }

  public async findAll(): Promise<IApiResponse<IRole[]>> {
    const response = await apiClient.get("/roles");
    return response.data;
  }

  public async findAllSoftRemoved(): Promise<IApiResponse<IRole[]>> {
    const response = await apiClient.get("/roles/soft-removed");
    return response.data;
  }

  public async softRemove(id: string): Promise<IApiResponse<IRole>> {
    const response = await apiClient.delete(`/roles/soft-remove/${id}`);
    return response.data;
  }

  public async restore(id: string): Promise<IApiResponse<IRole>> {
    const response = await apiClient.patch(`/roles/restore/${id}`);
    return response.data;
  }

  public async getDefaultPermissions() {
    const PERMISSIONS = [
      {
        id: 1,
        name: "Administradores",
        module: "admin",
        actions: [
          {
            id: 10,
            name: "Ver administradores",
            key: "admin-view",
            value: false,
          },
          {
            id: 11,
            name: "Crear administrador",
            key: "admin-create",
            value: false,
          },
          {
            id: 12,
            name: "Eliminar administrador",
            key: "admin-remove",
            value: false,
          },
        ],
      },
      {
        id: 2,
        name: "Roles",
        module: "roles",
        actions: [
          {
            id: 20,
            name: "Ver roles",
            key: "roles-view",
            value: false,
          },
          {
            id: 21,
            name: "Crear rol",
            key: "roles-create",
            value: false,
          },
          {
            id: 22,
            name: "Eliminar rol",
            key: "roles-remove",
            value: false,
          },
        ],
      },
      {
        id: 3,
        name: "Configuraciones",
        module: "settings",
        actions: [
          {
            id: 30,
            name: "Ver configuraciones",
            key: "settings-view",
            value: false,
          },
          {
            id: 31,
            name: "Crear configuración",
            key: "settings-create",
            value: false,
          },
          {
            id: 32,
            name: "Eliminar configuración",
            key: "settings-remove",
            value: false,
          },
        ],
      },
    ];

    return { statusCode: 200, data: PERMISSIONS };
  }
}

export const RolesService = RolesModuleService.getInstance();
