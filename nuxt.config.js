export default {
    // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
        title: "porteqali",
        meta: [{ charset: "utf-8" }, { name: "viewport", content: "width=device-width, initial-scale=1" }, { name: "format-detection", content: "telephone=no" }],
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
    css: ["~/assets/css/color_palette.css", "~/assets/css/main.css"],

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: [
        { src: "~/plugins/swiper.client.js", mode: "client" },
        { src: "~/plugins/mask.client.js", mode: "client" },
        { src: "~/plugins/money.client.js", mode: "client" },
        { src: "~plugins/clickaway.client.js", mode: "client" },
        { src: "~plugins/persianDatePicker.client.js", mode: "client" },
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
            short_name: "پرتقال",
            name: "گروه آموزشی پرتقال",
            description: "گروه آموزشی پرتقال",
            lang: "fa",
            theme_color: "#ff7952",
            dir: "rtl",
            display: "browser",
            crossorigin: "use-credentials",
            start_url: "/?source=pwa",
            scope: "/",
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
            ogHost: process.env.BASE_URL || "https://porteqali.com",

            twitterCard: "",
            twitterSite: "porteqali.com",
            twitterCreator: "porteqali",

            nativeUI: true,
        },
        workbox: {
            cleanupOutdatedCaches: true,
            runtimeCaching: [
                {
                    urlPattern: "/api/*",
                    handler: "networkOnly",
                },
            ],
            importScripts: ["custom-sw.js"],
            routingExtensions: ["static/routing-sw.js"],
        },
    },

    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {},

    serverMiddleware: [
        "~/server/gateway.js",
        "~/server/auth.js",
        "~/server/api.js",
        "~/server/payment.js",
        "~/server/checkIfRoleMatch.js",
        "~/server/marketingCode.js",
    ],
};
