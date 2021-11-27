const axios = require("axios").default;
const app = require("express")();
const csrf = require("csurf")({ cookie: true });

app.use(require("express").json());
app.use(require("cookie-parser")());
app.use(csrf);

const tokenExpireTime = 3600 * 24 * 7; // 1 week

const auth = async (req, res, url) => {
    await axios
        .post(`${process.env.API_BASE_URL}${url}`, { ...req.body }, { headers: { ...req.headers, server_secret: process.env.SERVER_SECRET, tt: Date.now() } })
        .then((results) => {
            res.cookie("AuthToken", results.data.token, { sameSite: "strict", path: "/", httpOnly: true, secure: true, maxAge: tokenExpireTime * 1000 });
            return res.end();
        })
        .catch((e) => {
            return res.status(e.response.status).json(e.response.data);
        });
};

app.post("/auth/login", async (req, res) => {
    await auth(req, res, "/auth/login");
});

app.post("/auth/register", async (req, res) => {
    await auth(req, res, "/auth/register");
});

app.get("/auth/login/google", (req, res) => {
    // TODO
    // redirect to google
    return res.end();
});

app.get("/auth/login/google/callback", (req, res) => {
    // TODO
    // get google data
    // if login with google was a success then request backend to get a token
    // set the token and redirect to /
    return res.end();
});

app.post("/auth/refresh", async (req, res) => {
    await auth(req, res, "/auth/refresh");
});

app.post("/auth/logout", (req, res) => {
    res.clearCookie("AuthToken");
    return res.end();
});

module.exports = app;
