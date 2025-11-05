import { defineConfig } from "vite";
import typecomposer from "typecomposer-plugin";
import dts from "vite-plugin-dts";
import path from "path";

export default defineConfig({
  plugins: [dts(), typecomposer()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: "modern-compiler",
      },
    },
  },
  build: {
    lib: {
      entry: "src/index.ts",
      name: process.env.npm_package_name,
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      external: ["typecomposer"],
      output: {
        format: "es",
      },
    },
  },
});
