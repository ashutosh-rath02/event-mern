import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      "/api/users": {
        target: "https://ucla-website.onrender.com/api/users",
        changeOrigin: true,
      },
      "/api/events": {
        target: "https://ucla-website.onrender.com/api/events",
        changeOrigin: true,
      },
    },
  },
});
