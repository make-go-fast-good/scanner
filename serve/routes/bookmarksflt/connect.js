const Express = require("express");
const Router = Express.Router();
const axios = require('axios');

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
            // console.log("KEYMODE HERE:" + request.query.keyMode)
            // console.log("ERROR HERE:" + request.query.error)
            // console.log("QUERY NAME HERE: " + request.query.m_name)
            // console.log("SRM STATUS HERE: " + request.query.srmStatus)
            const operationMode = await axios
                .get(request.query.keyMode,) //for GET
                .then(res => {
                    return res.data
                })
                .catch(err => {
                    console.log(err);
                })
            const srmStatus = await axios
                .get(request.query.srmStatus,) //for GET
                .then(res => {
                    let status = res.data
                    status = status.substring(80, 90)
                    return status
                })
                .catch(err => {
                    console.log(err);
                })
            const navError = await axios
                .get(request.query.error,) //for GET
                .then(res => {
                    let err = res.data
                    // remove whitespace from string
                    // err = parseInt(err.replace(/\s+/g, ""));
                    err = err.replace(/\s+/g, "");
                    parseInt(err, 10) ? err = true : err = false;
                    return err
                })
                .catch(err => {
                    console.log(err);
                })
            // console.log("OPERATION MODE: " + operationMode)
            // console.log("ERROR : " + navError)
            // console.log("SRM STATUS : " + srmStatus)

            let status = {
                name: request.query.m_name,
                color: "rgba(0, 0, 0, 0.8)",
                srmStatus: srmStatus
            }

            switch (operationMode) {
                case "auto":
                    status.color = "rgba(0, 215, 0, 0.7)"
                    break;
                case "semi":
                    status.color = "rgba(192, 192, 192, 0.7)"
                    break;
                case "local":
                    status.color = "rgba(200, 0, 0, 0.7)"
                    break;
                case "undefined":
                    status.color = "rgba(192, 192, 192, 0.7)"
                    break;
            }

            if (navError === true) status.color = "rgba(200, 0, 0, 0.7)"
            // <tr><td>I</td><td>2020-12-12 17:35:15:725</td><td id="desc"></td><td>41780</td><td>
            response.send(status);
        } else {
            response.send(err);
        }
    })
);

module.exports = Router;
