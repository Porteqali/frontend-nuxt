self.addEventListener("fetch", function (event) {
    if (event.request.url.match("^.*(/api/).*$")) return false;
    if (event.request.url.match("^(/api/).*$")) return false;
});
