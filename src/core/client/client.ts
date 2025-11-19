import axios, { AxiosError, type AxiosInstance, type AxiosResponse, type InternalAxiosRequestConfig } from "axios";

class ApiClient {
  private static instance: ApiClient;
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: import.meta.env.VITE_AUTH_API_URL,
      timeout: 10000,
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });

    this.setupInterceptors();
  }

  public static getInstance(): ApiClient {
    if (!ApiClient.instance) {
      ApiClient.instance = new ApiClient();
    }

    return ApiClient.instance;
  }

  private setupInterceptors(): void {
    this.axiosInstance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => config,
      (error: AxiosError) => Promise.reject(error),
    );

    this.axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error: AxiosError) => {
        const isLoginRoute = error.config?.url?.includes("/signIn");

        if (error.response?.status === 401 && !isLoginRoute) {
          window.location.href = "/";
        }

        return Promise.reject(error);
      },
    );
  }

  public getClient(): AxiosInstance {
    return this.axiosInstance;
  }
}

export const apiClient = ApiClient.getInstance().getClient();
