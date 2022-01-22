const axios = require("axios").default;
const app = require("express")();
const multer = require("multer");
const FormData = require("form-data");
var fsPromise = require("fs/promises");
var fs = require("fs");
var http = require("http");
const csrf = require("csurf")({ cookie: true });

app.use(require("express").json());
app.use(require("cookie-parser")());
app.use(csrf);

app.all("/api/*", multer().fields([{ name: "files" }]), async (req, res) => {
    let resStatus = 200;
    let resData = {};
    const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress || null;

    let data = { ...req.body };
    // if (!!req.files) data = { ...req.body, ...req.files };

    let formdataHeaders = {};
    let filesToDelete = [];
    if (typeof req.headers["content-type"] !== "undefined" && req.headers["content-type"].includes("multipart/form-data")) {
        try {
            const form = new FormData();
            for (const prop in req.body) form.append(prop, req.body[prop]);
            if (typeof req.files.files !== "undefined") {
                for (let i = 0; i < req.files.files.length; i++) {
                    // TODO
                    // make this a sharable folder and handle fileuploads here
                    const path = `uploads/${req.files.files[i].originalname}`;
                    await fsPromise.writeFile(path, req.files.files[i].buffer);
                    filesToDelete.push(path);
                    form.append("files", fs.createReadStream(path));
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
            // headers: { ...req.headers, "content-type": "application/json", "x-forwarded-for": ip, server_secret: process.env.SERVER_SECRET, tt: Date.now() },
            headers: { ...req.headers, ...formdataHeaders, "x-forwarded-for": ip, server_secret: process.env.SERVER_SECRET, tt: Date.now() },
            // maxContentLength: Infinity,
            // maxBodyLength: Infinity,
        })
        .then((response) => {
            resData = response.data;
        })
        .catch((error) => {
            if (typeof error.response !== "undefined") {
                resStatus = error.response.status;
                resData = error.response.data;
            } else console.log(error);
        })
        .finally(() => {
            filesToDelete.forEach(async (path) => await fsPromise.unlink(path));
        });

    if (!!resData) return res.status(resStatus).json(resData);
    else return res.status(resStatus).end();
});

app.get("/file/*", async (req, res) => {
    http.get(
        `${process.env.API_BASE_URL}${req.url}`,
        {
            headers: {
                ...req.headers,
                "x-forwarded-for": req.headers["x-forwarded-for"] || req.socket.remoteAddress || null,
                server_secret: process.env.SERVER_SECRET,
                tt: Date.now(),
            },
        },
        (response) => {
            if (response.statusCode >= 200 && response.statusCode < 400) {
                try {
                    res.writeHead(response.statusCode, { ...response.headers });
                    response.pipe(res);
                } catch (e) {}
            } else {
                console.log(response.statusCode);
                return res.status(404).end();
            }
        },
    );
});

module.exports = app;
