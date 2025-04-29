import { configureReact } from "@bn-digital/vite";

export default configureReact(
    {
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
                "@": "/src",
            },
        },
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
