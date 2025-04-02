import { configureReact } from "@bn-digital/vite";
import * as path from "node:path";

export default configureReact(
    {
        optimizeDeps: {

            exclude: ['@ffmpeg/ffmpeg']
        },
        server: {
            hmr: {
                overlay: true 
            } 
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
                '@ffmpeg/ffmpeg': '@ffmpeg/ffmpeg/dist/ffmpeg.min.js',
                '@': "/src",
            }
        }
    },
    {
        openGraph: {
            enabled: false,
        },
        pwa: {
            enabled: false,
        },
        buildInfo: {
            enabled: false,
        },
        react: {
            svg: {
                enabled: true,
            },
        },
        // lint: {
        //     enabled: true,
        //     stylelint: false,
        //     enableBuild: true,
        // },
        graphql: {
            enabled: true,
        },
        // analytics: { enableDev: true },
        // fonts: {
        //     google: {
        //         preconnect: true,
        //         families: [{ name: "Lato", styles: "wght@400;500;600;700;800;900", defer: true }],
        //         display: "auto",
        //     },
        // },
    }
);
