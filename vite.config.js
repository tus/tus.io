import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  define: {
    global: {},
  },
  resolve: {
    alias: {
      "/src": resolve(__dirname, "src"),
    },
  },
});
