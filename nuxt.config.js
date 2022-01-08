export default {
    // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
        title: "porteqali",
        meta: [
            { charset: "utf-8" },
            { name: "viewport", content: "width=device-width, initial-scale=1" },
            { hid: "description", name: "description", content: "" },
            { name: "format-detection", content: "telephone=no" },
        ],
        link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    },

    render: {
        bundleRenderer: {
            shouldPreload: (file, type) => {
                return ["script", "style", "font"].includes(type);
            },
            shouldPrefetch: (file, type) => {
                return ["script", "style", "font"].includes(type);
            },
        },
    },

    loading: {
        color: "orange",
        height: "5px",
    },

    // Global CSS: https://go.nuxtjs.dev/config-css
    css: ["video.js/dist/video-js.css", "~/assets/css/color_palette.css", "~/assets/css/main.css"],

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: [
        { src: "~/plugins/swiper.client.js", mode: "client" },
        { src: "~/plugins/mask.client.js", mode: "client" },
        { src: "~plugins/video.client.js", mode: "client" },
    ],

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [
        "@nuxtjs/pwa",

        // https://go.nuxtjs.dev/tailwindcss
        "@nuxtjs/tailwindcss",
    ],

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [
        // https://go.nuxtjs.dev/axios
        "@nuxtjs/axios",
        // https://go.nuxtjs.dev/pwa
        "@nuxtjs/pwa",
    ],

    // Axios module configuration: https://go.nuxtjs.dev/config-axios
    axios: {},

    // PWA module configuration: https://go.nuxtjs.dev/pwa
    pwa: {
        manifest: {
            name: "Porteqali",
            description: "",
            lang: "fa",
            theme_color: "#ff7952",
            dir: "rtl",
        },
        icon: {
            source: "~static/icon.png",
        },
        meta: {
            author: "porteqali",
            description: "",
            theme_color: "#ff7952",
            lang: "fa",
            ogSiteName: "porteqali.com",
            ogDescription: "",
            ogHost: "http://localhost",

            twitterCard: "",
            twitterSite: "porteqali.com",
            twitterCreator: "porteqali",

            nativeUI: true,
        },
    },

    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {},

    serverMiddleware: ["~/server/csrf.js", "~/server/auth.js", "~/server/api.js", "~/server/payment.js"],
};
