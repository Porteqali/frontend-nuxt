const { post } = require("axios").default;
const app = require("express")();
const csrf = require("csurf")({ cookie: true });

app.use(require("express").json());
app.use(require("cookie-parser")());
app.use(csrf);

const checkIfAdmin = async (req, res) => {
    let isAdmin = false;

    const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress || null;
    await post(`${process.env.API_BASE_URL}/auth/check-if-admin`, null, {
        timeout: 30 * 1000,
        headers: { ...req.headers, "x-forwarded-for": ip, server_secret: process.env.SERVER_SECRET, tt: Date.now() },
    })
        .then((results) => (isAdmin = true))
        .catch((e) => {});

    return isAdmin;
};

app.all("/admin", async (req, res, next) => {
    if (await checkIfAdmin(req, res)) next();
    else return res.status(404).end();
});
app.all("/admin/*", async (req, res, next) => {
    if (await checkIfAdmin(req, res)) next();
    else return res.status(404).end();
});

module.exports = app;
