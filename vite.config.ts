/// <reference types="vitest/config" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@account": path.resolve(__dirname, "./src/features/account"),
      "@admin": path.resolve(__dirname, "./src/features/admin"),
      "@auth": path.resolve(__dirname, "./src/core/auth"),
      "@components": path.resolve(__dirname, "./src/core/components"),
      "@dashboard": path.resolve(__dirname, "./src/features/dashboard"),
      "@core": path.resolve(__dirname, "./src/core"),
      "@layouts": path.resolve(__dirname, "./src/features/layouts"),
      "@lib": path.resolve(__dirname, "./src/lib"),
      "@login": path.resolve(__dirname, "./src/features/login"),
      "@permissions": path.resolve(__dirname, "./src/features/permissions"),
      "@roles": path.resolve(__dirname, "./src/features/roles"),
      "@settings": path.resolve(__dirname, "./src/features/settings"),
    },
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./src/test/setup.ts",
  },
});
