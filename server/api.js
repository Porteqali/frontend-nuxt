const axios = require("axios").default;
const app = require("express")();
const multer = require("multer");
const FormData = require("form-data");
var fsPromise = require("fs/promises");
var fs = require("fs");
var http = require("http");
var https = require("https");
const csrf = require("csurf")({ cookie: true });

app.use(require("express").json());
app.use(require("cookie-parser")());
app.use(csrf);

app.all("/api/*", multer().any(), async (req, res) => {
    let resStatus = 499;
    let resData = {};
    const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress || null;
    delete req.headers["host"];

    let data = { ...req.body };

    let formdataHeaders = {};
    let filesToDelete = [];
    if (typeof req.headers["content-type"] !== "undefined" && req.headers["content-type"].includes("multipart/form-data")) {
        try {
            const form = new FormData();
            for (const prop in req.body) form.append(prop, req.body[prop]);
            if (!!req.files) {
                for (let i = 0; i < req.files.length; i++) {
                    const file = req.files[i];
                    const path = `uploads/${Math.floor(Math.random() * 1000).toString()}${file.originalname}`;
                    await fsPromise.writeFile(path, file.buffer);
                    filesToDelete.push(path);
                    form.append(file.fieldname, fs.createReadStream(path));
                }
            }
            formdataHeaders = { ...form.getHeaders() };
            data = form;
            delete req.headers["content-length"];
        } catch (e) {
            console.log(e);
            return res.status(500).end();
        }
    }

    await axios
        .request({
            method: req.method,
            url: `${process.env.API_BASE_URL}${req.url}`.replace("/api/", "/"),
            data: data,
            timeout: 30 * 1000,
            headers: { ...req.headers, ...formdataHeaders, "x-forwarded-for": ip, serversecret: process.env.SERVER_SECRET, tt: Date.now() },
            maxBodyLength: Infinity,
            // maxContentLength: Infinity,
        })
        .then((response) => {
            resStatus = 200;
            resData = response.data;
        })
        .catch((error) => {
            // TODO : remove else part in production
            if (typeof error.response !== "undefined") {
                resStatus = error.response.status;
                resData = error.response.data;
            } else {
                console.log(error);
            }
        })
        .finally(() => {
            filesToDelete.forEach(async (path) => await fsPromise.unlink(path));
        });

    if (!!resData) {
        switch (typeof resData) {
            case "object":
                return res.status(resStatus).json(resData);
            case "string":
                return res.status(resStatus).write(resData);
        }
    } else return res.status(resStatus).end();
});

app.get("/file/*", async (req, res) => {
    const baseUrl = process.env.API_BASE_URL;
    const protocol = baseUrl.includes("https://") ? https : http;
    const x_forwarded_for = req.headers["x-forwarded-for"] || req.socket.remoteAddress || null;
    delete req.headers["host"];

    protocol.get(
        `${baseUrl}${req.url}`,
        { headers: { ...req.headers, "x-forwarded-for": x_forwarded_for, serversecret: process.env.SERVER_SECRET, tt: Date.now() } },
        (response) => {
            if (response.statusCode >= 200 && response.statusCode < 400) {
                try {
                    res.writeHead(response.statusCode, { ...response.headers });
                    response.pipe(res);
                } catch (e) {}
            } else {
                return res.status(404).end();
            }
        },
    );
});

module.exports = app;
