import { defineConfig } from "vite";
import path from "node:path";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/go-taiwan/",
  plugins: [svgr(), react()],
  resolve: {
    alias: [{ find: "#", replacement: path.resolve(__dirname, "src") }],
  },
});
