import type { IAdmin } from "@admin/interfaces/admin.interface";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  admin?: IAdmin;
  loadingAdmin: boolean;
  clearAdmin: () => void;
  setAdmin: (admin?: IAdmin) => void;
  setLoadingAdmin: (loading: boolean) => void;
}

export const useAuthStore = create(
  persist<AuthState>(
    (set) => ({
      admin: undefined,
      loadingAdmin: false,

      clearAdmin: () => set({ admin: undefined }),
      setAdmin: (admin) => set({ admin }),
      setLoadingAdmin: (loading) => set({ loadingAdmin: loading }),
    }),
    { name: "admin" },
  ),
);
