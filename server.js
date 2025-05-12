const loadEnvConfig = require("@next/env").loadEnvConfig;
loadEnvConfig(process.cwd(), process.env.NODE_ENV !== "production");

global.Promise = require("bluebird");
const _ = require("lodash");
const express = require("express");
const session = require("express-session");
const grant = require("grant").express();
const next = require("next");
const bodyParser = require("body-parser");

const grantConfig = require("./grant.config");

const port = parseInt(process.env.PORT) || 3000;
const hostname = process.env.HOSTNAME || "0.0.0.0";
const dev = process.env.NODE_ENV !== "production";

const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare()
    .then(() => {
        const server = express();

        server.use(bodyParser.json());
        server.use(bodyParser.urlencoded({ extended: false }));
        server.use(
            session({ secret: "grant", saveUninitialized: true, resave: false })
        );
        server.use(grant(grantConfig));

        server.get("*", (req, res) => {
            return handle(req, res);
        });

        server.listen(port, hostname, (error) => {
            if (error) {
                console.info("error", error);

                throw error;
            }

            console.log(`> Ready on http://${hostname}:${port}`);
        });
    })
    .catch((e) => {
        console.error(e);
        process.exit(1);
    });
