const app = require("express")();
const csrf = require("csurf")({ cookie: true });

app.use(require("cookie-parser")());

app.get("*", csrf, (req, res, next) => {
    res.cookie("XSRF-TOKEN", req.csrfToken(), { secure: true });
    next();
});

module.exports = app;
