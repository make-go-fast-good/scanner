const Express = require("express");
const Router = Express.Router();
const opn = require('opn');
const fs = require("fs");
const path = require('path');
//make the CORS work, wrap the router in the middle man to catch errors.
const wrapper = middleware => {
    return async (req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, X-Requested-With, Content-Type, Accept, Authorization"
        );
        if (req.method === "OPTIONS") {
            res.header(
                "Access-Control-Allow-Methods",
                "PUT, POST, PATCH, DELETE, GET"
            );
        }
        try {
            await middleware(req, res, next);
        } catch (err) {
            next(err);
        }
    };
};

Router.get(
    "/",
    wrapper(async (request, response) => {
        if (request.query.m_name) {
            let exePath = path.join(path.dirname(process.cwd())) + '\\s7_server\\navhist.exe'
            response.send(exePath + " " + request.query.m_name);
            opn(exePath, {wait: true});
        } else {
            response.send(err);
        }
    })
);

module.exports = Router;
