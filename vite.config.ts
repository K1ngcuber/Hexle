import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";

export default defineConfig({
  plugins: [solidPlugin()],
  server: {
    port: 4000,
  },
  build: {
    target: "esnext",
  },
  base: "https://k1ngcuber.github.io/Hexle/docs/",
});
