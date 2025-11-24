import type { IAdmin } from "@admin/interfaces/admin.interface";
import type { IApiResponse } from "@core/interfaces/api-response.interface";
import type { ICredentials, ISignIn } from "@core/interfaces/auth.interface";
import { apiClient } from "@core/client/client";

class AuthService {
  private static instance: AuthService;

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }

    return AuthService.instance;
  }

  public async signIn(credentials: ICredentials): Promise<IApiResponse<ISignIn>> {
    const response = await apiClient.post<IApiResponse<ISignIn>>("/auth/signIn", credentials);
    return response.data;
  }

  public async signOut(): Promise<IApiResponse<null>> {
    const response = await apiClient.get("/auth/signOut");
    return response.data;
  }

  public async getAdmin(): Promise<IApiResponse<IAdmin>> {
    const response = await apiClient.get<IApiResponse<IAdmin>>("/auth/admin");
    return response.data;
  }
}

export const AuthAPI = AuthService.getInstance();
