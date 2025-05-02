// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import path from "path";

export default defineConfig({
    server: {
        hmr: {
            overlay: true,
        },
    },
    css: {
        preprocessorOptions: {
            less: {
                additionalData: `
                    @import "@/styles/mixins.less";
                    @import "@/styles/build-variables.less";
                `,
            },
        },
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "src"),
            src: path.resolve(__dirname, "src"),
        },
    },
    plugins: [
        react(),
        svgr({
            svgrOptions: {
                icon: true,
            },
        }),
    ],
    build: {
        sourcemap: true, // Optional: Helps in debugging the build
    },
    openGraph: {
        enabled: false,
    },
    pwa: {
        enabled: false,
    },
    buildInfo: {
        enabled: false,
    },
    graphql: {
        enabled: true,
    },
    react: {
        jsxRuntime: "automatic",
        babel: {
            plugins: [],
        },
    },
});
