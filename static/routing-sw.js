workbox.routing.registerRoute("/", {
    whitelist: [/^\/$/],
    blacklist: [/^\/api\/$/],
});
