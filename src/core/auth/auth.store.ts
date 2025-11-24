import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { IAdmin } from "@admin/interfaces/admin.interface";

interface AuthState {
  admin?: IAdmin;
  setAdmin: (admin?: IAdmin) => void;
  clearAdmin: () => void;
}

export const useAuthStore = create(
  persist<AuthState>(
    (set) => ({
      admin: undefined,
      setAdmin: (admin) => set({ admin }),
      clearAdmin: () => set({ admin: undefined }),
    }),
    { name: "admin" },
  ),
);
