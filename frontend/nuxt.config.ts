// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: "2024-04-03",
    devtools: { enabled: true },
    modules: ["@pinia/nuxt", "@nuxt/image"],
    pinia: {
        storesDirs: ["./stores/**"],
    },
    ssr: false,

    nitro: {
        devProxy: {
            "/api": { target: process.env.API_SERVER, changeOrigin: true },
        },
    },

    css: ["@/assets/styles/global.scss"],
    vite: {
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: '@import "@/assets/styles/variables.scss";',
                },
            },
        },
    },
});
