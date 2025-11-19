import { apiClient } from "@core/client/client";
import type { IApiResponse } from "@core/interfaces/api-response.interface";
import type { ICredentials, ISignIn } from "@core/interfaces/auth.interface";

class AuthService {
  private static instance: AuthService;

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }

    return AuthService.instance;
  }

  public async signIn(credentials: ICredentials): Promise<IApiResponse<ISignIn>> {
    const response = await apiClient.post<IApiResponse<ISignIn>>("/signIn", credentials);
    return response.data;
  }

  public async signOut(): Promise<IApiResponse<null>> {
    const response = await apiClient.get("/signOut");
    return response.data;
  }
}

export const AuthAPI = AuthService.getInstance();
