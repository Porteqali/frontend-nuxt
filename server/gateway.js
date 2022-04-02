const axios = require("axios").default;
const app = require("express")();
const csrf = require("csurf")({ cookie: true });

app.use(require("cookie-parser")());

app.get("*", csrf, async (req, res, next) => {
    const urlArray = req.url.split("/");

    if (urlArray[1] != "api") res.cookie("XSRF-TOKEN", req.csrfToken(), { secure: true });

    if (urlArray.length === 2 && !!urlArray[1]) {
        if (await checkMarketingCode(req, res, urlArray[1])) return res.redirect("/");
    }

    next();
});

async function checkMarketingCode(req, res, code) {
    delete req.headers["host"];
    const strips = [
        "~",
        "`",
        "!",
        "@",
        "#",
        "$",
        "%",
        "^",
        "*",
        "(",
        ")",
        "+",
        "[",
        "{",
        "]",
        "}",
        "\\",
        "/",
        "|",
        ";",
        ":",
        '"',
        "'",
        "â€”",
        "â€“",
        ",",
        "<",
        ".",
        ">",
    ];
    strips.forEach((strip) => (code = code.replace(new RegExp(`\\${strip}`, "g"), "")));

    // check if marketing code exist or not
    let marketerExists = false;
    let data = {};
    await axios
        .post(`${process.env.API_BASE_URL}/marketers/check-code/${code}`, data, {
            headers: { ...req.headers, serversecret: process.env.SERVER_SECRET, tt: Date.now() },
        })
        .then((results) => (marketerExists = true))
        .catch((e) => {});

    if (marketerExists) {
        res.cookie("marketing_code", code, { sameSite: "strict", path: "/", httpOnly: true, secure: true, maxAge: 3600 * 2 * 1000 });
        return true;
    }

    return false;
}

module.exports = app;
