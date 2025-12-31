import type { IAdmin } from "@admin/interfaces/admin.interface";
import type { IApiResponse } from "@core/interfaces/api-response.interface";
import type { ICredentials, ISignIn } from "@auth/interfaces/auth.interface";
import { apiClient } from "@core/client/client";

class AuthModuleService {
  private static instance: AuthModuleService;

  public static getInstance(): AuthModuleService {
    if (!AuthModuleService.instance) {
      AuthModuleService.instance = new AuthModuleService();
    }

    return AuthModuleService.instance;
  }

  public async signIn(credentials: ICredentials): Promise<IApiResponse<ISignIn>> {
    const response = await apiClient.post<IApiResponse<ISignIn>>("/auth/signIn", credentials);
    return response.data;
  }

  public async signOut(): Promise<IApiResponse<null>> {
    // TODO: type get()
    const response = await apiClient.get("/auth/signOut");
    return response.data;
  }

  public async getAdmin(): Promise<IApiResponse<IAdmin>> {
    const response = await apiClient.get<IApiResponse<IAdmin>>("/auth/admin");
    return response.data;
  }
}

export const AuthService = AuthModuleService.getInstance();
