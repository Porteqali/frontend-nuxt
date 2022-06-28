const axios = require("axios").default;
const app = require("express")();
const passport = require("passport");
const csrf = require("csurf")({ cookie: true });

app.use(require("express").json());
app.use(require("cookie-parser")());
app.use(csrf);

// setup passport
require("./passport/googleOauth20.strategy").default();
app.use(passport.initialize());

const tokenExpireTime = 3600 * 24 * 7; // 1 week

const auth = async (req, res, url, redirect = false) => {
    const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress || null;
    delete req.headers["host"];

    await axios
        .post(
            `${process.env.API_BASE_URL}${url}`,
            { ...req.body },
            { headers: { ...req.headers, ipaddr: ip, serversecret: process.env.SERVER_SECRET, tt: Date.now() } },
        )
        .then((results) => {
            const returnResponse = { ...results.data };
            if (!!results.data.token) {
                res.cookie("AuthToken", results.data.token, { sameSite: "strict", path: "/", httpOnly: true, secure: true, maxAge: tokenExpireTime * 1000 });
                delete returnResponse["token"], delete returnResponse["user"];
            }
            if (redirect) return res.redirect("/");
            return res.json(returnResponse);
        })
        .catch((e) => {
            if (redirect) return res.redirect("/");
            return res.status(e.response.status).json(e.response.data);
        });
};

app.post("/auth/login", async (req, res) => {
    await auth(req, res, "/auth/login");
});

app.post("/auth/send-code", async (req, res) => {
    await auth(req, res, "/auth/send-code");
});
app.post("/auth/verify", async (req, res) => {
    await auth(req, res, "/auth/verify");
});
app.post("/auth/register", async (req, res) => {
    await auth(req, res, "/auth/register");
});

app.get("/auth/login/google", passport.authenticate("googleLogin", { scope: ["profile", "email"] }));
app.get("/auth/login/google/callback", async (req, res, next) => {
    await passport.authenticate("googleLogin", { failureRedirect: "/login" }, async (err, profile) => {
        req.body.profile = profile;
        await auth(req, res, "/auth/continue-with-google", true);
    })(req, res, next);
});

app.post("/auth/refresh", async (req, res) => {
    await auth(req, res, "/auth/refresh");
});

app.post("/auth/logout", (req, res) => {
    res.clearCookie("AuthToken");
    return res.end();
});

app.post("/auth/forget-password/*", async (req, res) => {
    delete req.headers["host"];
    await axios
        .post(`${process.env.API_BASE_URL}${req.url}`, { ...req.body }, { headers: { ...req.headers, serversecret: process.env.SERVER_SECRET, tt: Date.now() } })
        .then((results) => res.json({ ...results.data }))
        .catch((e) => {
            return res.status(e.response.status).json(e.response.data);
        });
});

module.exports = app;
