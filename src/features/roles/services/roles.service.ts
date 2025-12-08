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

  public async create(role: Partial<IRole>) {
    console.log(role);
    return { statusCode: 201, message: "Rol creado fake", data: role };
  }

  // public async create(role: Partial<IRole>): Promise<IApiResponse<IRole>> {
  //   const response = await apiClient.post("/roles", role);
  //   return response.data;
  // }

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
            name: "Crear administrador",
            key: "admin-create",
            value: false,
          },
          {
            id: 11,
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
            name: "Crear rol",
            key: "roles-create",
            value: false,
          },
          {
            id: 21,
            name: "Eliminar rol",
            key: "roles-remove",
            value: false,
          },
        ],
      },
    ];

    return { statusCode: 200, data: PERMISSIONS };
  }
}

export const RolesService = RolesModuleService.getInstance();
