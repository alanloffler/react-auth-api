import type { IAdmin } from "@admin/interfaces/admin.interface";
import { AdminService } from "@/features/admin/services/admin.service";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

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
        if (!currentAdmin?.id) return;

        try {
          set({ loadingAdmin: true });
          const response = await AdminService.findOne(currentAdmin.id);

          if (response?.statusCode === 200 && response.data) {
            set({ admin: response.data });
          }
        } catch (error) {
          console.error("Error refrescando admin:", error);
        } finally {
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
