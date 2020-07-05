const Express = require("express");
const Router = Express.Router();
const axios = require("axios");

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
        if (request.query.url) {
            axios
                .get(request.query.url, {
                    auth: {
                        key: "guest",
                        password: "guest"
                    }
                })
                .then(res => {
                    console.log("res.data");
                    console.log(res);
                    response.send(res.data);
                })
                .catch(err => {
                    console.log("err = " + err);
                    response.send(err);
                });
        } else {
            console.log("something wrong");
        }
    })
);

module.exports = Router;
