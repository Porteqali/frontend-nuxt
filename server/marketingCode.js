const axios = require("axios").default;
const app = require("express")();
const csrf = require("csurf")({ cookie: true });

app.use(require("express").json());
app.use(require("cookie-parser")());
app.use(csrf);

app.post("/set-marketer-code/:code", async (req, res) => {
    delete req.headers["host"];
    let code = req.params.code;
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

    console.log({ marketerExists });
    if (marketerExists) {
        res.cookie("marketing_code", code, { sameSite: "strict", path: "/", httpOnly: true, secure: true, maxAge: 3600 * 2 * 1000 });
        return res.end();
    }
    return res.status(404).end();
});

module.exports = app;
