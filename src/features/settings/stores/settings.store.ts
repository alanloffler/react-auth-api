import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import type { ISetting } from "@settings/interfaces/setting.interface";
import { SettingsService } from "@settings/services/settings.service";
import { tryCatch } from "@core/utils/try-catch";

interface IStates {
  loading?: boolean;
  loadingAppSettings: Record<string, boolean>;
  appSettings: ISetting[];
  settings: ISetting[];
  error?: string | null;

  loadSettings: () => Promise<void>;
  loadAppSettings: () => Promise<void>;
  updateAppSetting: (id: string, value: string) => Promise<void>;
}

export const useSettingsStore = create(
  persist<IStates>(
    (set) => ({
      loading: false,
      loadingAppSettings: {},
      appSettings: [],
      settings: [],
      error: null,

      loadSettings: async () => {
        set({ loading: true, error: null });

        const [response, error] = await tryCatch(SettingsService.findAll());
        if (error) {
          set({ error: error.message, loading: false });
          return;
        }

        if (response && response.statusCode === 200 && response.data) {
          set({ settings: response.data, loading: false });
        }
      },
      loadAppSettings: async () => {
        set({ loading: true, error: null });

        const [response, error] = await tryCatch(SettingsService.findByModule("app"));

        if (error) {
          set({ error: error.message, loading: false });
          return;
        }

        if (response && response.statusCode === 200 && response.data) {
          set({ appSettings: response.data, loading: false });
        }
      },
      updateAppSetting: async (id: string, value: string) => {
        set((state) => ({
          loadingAppSettings: { ...state.loadingAppSettings, [id]: true },
          error: null,
        }));

        const [response, error] = await tryCatch(SettingsService.update(id, value));

        if (error) {
          set((state) => ({
            error: error.message,
            loadingAppSettings: { ...state.loadingAppSettings, [id]: false },
          }));
          return;
        }

        if (response && response.statusCode === 200 && response.data) {
          set((state) => ({
            appSettings: state.appSettings.map((setting) => (setting.id === id ? { ...setting, value } : setting)),
            loadingAppSettings: { ...state.loadingAppSettings, [id]: false },
          }));
        }
      },
    }),
    {
      name: "app-settings",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
