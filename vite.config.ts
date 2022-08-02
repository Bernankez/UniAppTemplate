/// <reference types="vitest" />
import { defineConfig, loadEnv } from "vite";
import uni from "@dcloudio/vite-plugin-uni";
import Unocss from "unocss/vite";
import transformWxClass from "unplugin-transform-wx-class/vite";
import { viteMockServe } from "vite-plugin-mock";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode, command }) => {
  const env = loadEnv(mode, resolve(process.cwd(), "./uni_configs"));
  const isH5 = !process.argv.includes("-p");
  const isDev = command === "serve";

  const server = {
    port: 3000,
    proxy: {
      "/api": {
        target: env.VITE_APP_DOMAIN,
        changeOrigin: true,
      },
    },
  };

  return {
    plugins: [
      uni({
        vueOptions: {
          reactivityTransform: true,
        },
      }),
      Unocss(),
      transformWxClass(),
      viteMockServe({
        mockPath: "src/mock",
        localEnabled: command === "serve" && env.VITE_APP_MOCK === "enable",
      }),
    ],
    resolve: {
      alias: {
        "@": resolve(__dirname, "./src"),
      },
    },
    envDir: "./uni_configs",
    server: isH5 && isDev ? server : undefined,
  };
});
