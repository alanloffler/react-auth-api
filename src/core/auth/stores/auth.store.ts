import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import type { IAdmin } from "@admin/interfaces/admin.interface";
import { AccountService } from "@account/services/profile.service";

interface AuthState {
  admin?: IAdmin;
  loadingAdmin: boolean;
  clearAdmin: () => void;
  refreshAdmin: () => Promise<void>;
  setAdmin: (admin?: IAdmin) => void;
  setLoadingAdmin: (loading: boolean) => void;
}

export const useAuthStore = create(
  persist<AuthState>(
    (set, get) => ({
      admin: undefined,
      loadingAdmin: false,

      clearAdmin: () => set({ admin: undefined }),
      setAdmin: (admin) => set({ admin }),
      setLoadingAdmin: (loading) => set({ loadingAdmin: loading }),
      refreshAdmin: async () => {
        const currentAdmin = get().admin;
        if (!currentAdmin) return;

        try {
          set({ loadingAdmin: true });
          const response = await AccountService.get();

          if (response?.statusCode === 200 && response.data) {
            set({ admin: response.data, loadingAdmin: false });
          }
        } catch (error) {
          console.error("Error refrescando admin:", error);
          set({ loadingAdmin: false });
        }
      },
    }),
    {
      name: "admin",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
