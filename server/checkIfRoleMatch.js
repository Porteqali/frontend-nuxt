const { post } = require("axios").default;
const app = require("express")();
const csrf = require("csurf")({ cookie: true });

app.use(require("express").json());
app.use(require("cookie-parser")());
app.use(csrf);

const checkIfRole = async (req, res, role) => {
    let isRole = false;

    const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress || null;
    delete req.headers["host"];
    
    await post(`${process.env.API_BASE_URL}/auth/check-if-role/${role}`, null, {
        timeout: 30 * 1000,
        headers: { ...req.headers, "x-forwarded-for": ip, serversecret: process.env.SERVER_SECRET, tt: Date.now() },
    })
        .then((results) => (isRole = true))
        .catch((e) => {});

    return isRole;
};

// =========================================================

app.all("/admin", async (req, res, next) => {
    if (await checkIfRole(req, res, "admin")) next();
    else return res.status(404).end();
});
app.all("/admin/*", async (req, res, next) => {
    if (await checkIfRole(req, res, "admin")) next();
    else return res.status(404).end();
});

// =========================================================

app.all("/teacher-panel", async (req, res, next) => {
    if (await checkIfRole(req, res, "teacher")) next();
    else return res.status(404).end();
});
app.all("/teacher-panel/*", async (req, res, next) => {
    if (await checkIfRole(req, res, "teacher")) next();
    else return res.status(404).end();
});

// =========================================================

app.all("/marketer-panel", async (req, res, next) => {
    if (await checkIfRole(req, res, "marketer")) next();
    else return res.status(404).end();
});
app.all("/marketer-panel/*", async (req, res, next) => {
    if (await checkIfRole(req, res, "marketer")) next();
    else return res.status(404).end();
});

module.exports = app;
