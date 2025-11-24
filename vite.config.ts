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
      "@admin": path.resolve(__dirname, "./src/features/admin"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@core": path.resolve(__dirname, "./src/core"),
      "@lib": path.resolve(__dirname, "./src/lib"),
      "@login": path.resolve(__dirname, "./src/features/login"),
    },
  },
});
