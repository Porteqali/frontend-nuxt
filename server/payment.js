const axios = require("axios").default;
const app = require("express")();
const csrf = require("csurf")({ cookie: true });

app.use(require("express").json());
app.use(require("cookie-parser")());
app.use(csrf);

const handlePayment = async (req, res, url) => {
    const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress || null;
    delete req.headers["host"];

    await axios
        .request({
            method: req.method,
            url: `${process.env.API_BASE_URL}${url}`,
            timeout: 30 * 1000,
            headers: { ...req.headers, "x-forwarded-for": ip, serversecret: process.env.SERVER_SECRET, tt: Date.now() },
        })
        .then((response) => {
            return res.json({ link: response.data.redirectUrl });
        })
        .catch((error) => {
            console.log(error);
            console.log(req.headers);
            return res.json({ link: "/purchase-result?errorCode=500&errorMessage=InternalServerError" });
        });
};

app.get("/payment-callback-handler/course/:method", async (req, res) => {
    const url = req.url.replace('payment-callback-handler/course','course-payment-callback');
    await handlePayment(req, res, url);
});
app.get("/payment-callback-handler/wallet-charge/:method", async (req, res) => {
    const url = req.url.replace('payment-callback-handler/wallet-charge','wallet-payment-callback');
    await handlePayment(req, res, url);
});

module.exports = app;
