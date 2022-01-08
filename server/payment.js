const axios = require("axios").default;
const app = require("express")();
const csrf = require("csurf")({ cookie: true });

app.use(require("express").json());
app.use(require("cookie-parser")());
app.use(csrf);

app.get("/payment-callback/:method", async (req, res) => {
    const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress || null;

    await axios
        .request({
            method: req.method,
            url: `${process.env.API_BASE_URL}${req.url}`,
            timeout: 30 * 1000,
            headers: { ...req.headers, "x-forwarded-for": ip, server_secret: process.env.SERVER_SECRET, tt: Date.now() },
        })
        .then((response) => {
            return res.redirect(response.data.redirectUrl);
        })
        .catch((error) => {
            console.log(error);
            return res.redirect("/purchase-result?errorCode=500&errorMessage=InternalServerError");
        });
});

module.exports = app;
