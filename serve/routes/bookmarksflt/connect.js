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
            const keyMode = await axios
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
                    status = status.substring(78, 88);
                    // regex to remove html tag, the lenght of returned status varies
                    status = status.replace(/[td<>\/]/g, '');

                    // switch (request.query.m_name) {
                    //     // For whatever reason the navettes don't send status in a consistent manner
                    //     case "N2203":
                    //         status = status.substring(81, 83);
                    //         break;
                    //     case "N3201":
                    //     case "N3202":
                    //     case "N2202":
                    //     case "N5201":
                    //     case "N6101":
                    //     case "NL2084":
                    //     case "NL2085":
                    //     case "NL3085":
                    //         status = status.substring(82, 84);
                    //         break;
                    //     default:
                    //         status = status.substring(83, 85);
                    //         break;
                    // }
                    // status = status.substring(80, 90)
                    return status
                })
                .catch(err => {
                    console.log(err);
                })
            const navErrorString = await axios
                .get(request.query.error,) //for GET
                .then(res => {
                    let err = res.data
                    // remove whitespace from string
                    // err = parseInt(err.replace(/\s+/g, ""));
                    err = err.replace(/\s+/g, "");
                    // parseInt(err, 10) ? err = true : err = false;
                    return err
                })
                .catch(err => {
                    console.log(err);
                })
            // console.log("OPERATION MODE: " + keyMode)
            // console.log("ERROR : " + navErrorString)
            // console.log("SRM STATUS : " + srmStatus)
            //
            let navError;
            parseInt(navErrorString) > 0 ? navError = true : navError = false

            let status = {
                name: request.query.m_name,
                backgroundColor: "rgba(0, 0, 0, 0.8)",
                srmStatus: srmStatus,
                keyMode: keyMode,
                navErrorString: navErrorString,
                navError: navError
            }

            switch (keyMode) {
                case "auto":
                    status.backgroundColor = "rgba(0, 215, 0, 0.7)"
                    break;
                case "semi":
                    status.backgroundColor = "rgba(192, 192, 192, 0.7)"
                    break;
                case "local":
                    status.backgroundColor = "rgba(200, 0, 0, 0.7)"
                    break;
                case "undefined":
                    status.backgroundColor = "rgba(192, 192, 192, 0.7)"
                    break;
            }

            srmStatus == "10" ? status.backgroundColor = "rgba(0, 215, 0, 0.7)" : status.backgroundColor = "rgba(192, 192, 192, 0.7)"

            if (navError === true) status.backgroundColor = "rgba(200, 0, 0, 0.7)"
            // <tr><td>I</td><td>2020-12-12 17:35:15:725</td><td id="desc"></td><td>41780</td><td>
            response.send(status);
        } else {
            response.send(err);
        }
    })
);

module.exports = Router;
