const Express = require("express");
const Router = Express.Router();
const axios = require("axios");

//make the CORS work, wrap the router in the middle man to catch errors.
const wrapper = (middleware) => {
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
      const keyMode = await axios
        .get(request.query.keyMode, { timeout: 25000 })
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          console.log(err);
        });

      const srmStatus = await axios
        .get(request.query.srmStatus, { timeout: 25000 })
        .then((res) => {
          let status = res.data;
          status = status.substring(78, 88);
          // regex to remove html tag, the lenght of returned status varies
          // status = status.replace(/[td<>\/]/g, '');

          status = status.replace(/[a-zI"=<>\/]+|'\d*'/g, "");
          return status;
        })
        .catch((err) => {
          console.log(err);
        });
      const navErrorString = await axios
        .get(request.query.error, { timeout: 25000 }) //for GET
        .then((res) => {
          let err = res.data;
          // remove whitespace from string
          // err = parseInt(err.replace(/\s+/g, ""));
          err = err.replace(/\s+/g, "");
          // parseInt(err, 10) ? err = true : err = false;
          return err;
        })
        .catch((err) => {
          console.log(err);
        });

      const sinceLastOrder = await axios
        .get(request.query.orderStatus, { timeout: 25000 })
        .then((res) => {
          let status = res.data;
          // its a whole html page, get the last row
          // <tr><td>I</td><td>2020-12-13 10:26:33:092</td><td id="desc"></td><td>FB 	0F 06 54 00 00 00 49 74 EF 02 9E 05 B1 36 00 00 B0 36 00 00 D3 00 </td></tr></table></body></html>
          status = status.substring(status.length - 171, status.length - 1);
          // remove the html tags
          status = status.replace(/[a-zI"=<>\/\t\n]/g, "");
          // now there's only a string, need T instead of space
          status = status.replace(/ /g, "T");
          status = status.substring(0, 16);
          // make new date out of stripped string
          last = new Date(status);
          _now = new Date();
          let elapsed = (_now - last) / 3600000.0;
          elapsed = elapsed.toFixed(3) + " hours";
          //3600000 ms in an hour
          return elapsed;
        })
        .catch((err) => {
          console.log(err);
        });

      parseInt(navErrorString) > 0 ? (navError = true) : (navError = false);
      // sinceLastOrder > 3600000 ? (overHour = true) : (overHour = false);
      parseInt(sinceLastOrder) > 1.0 ? (overHour = true) : (overHour = false);

      let status = {
        name: request.query.m_name,
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        srmStatus: srmStatus,
        keyMode: keyMode,
        navErrorString: navErrorString,
        navError: navError,
        sinceLastOrder: sinceLastOrder,
        overHour: overHour,
      };

      switch (keyMode) {
        case "auto":
          status.backgroundColor = "rgba(0, 215, 0, 0.7)";
          break;
        case "semi":
          status.backgroundColor = "rgba(160, 160, 160, 0.7)";
          // status.backgroundColor = "rgba(210, 210, 210, 0.7)"
          break;
        case "local":
          status.backgroundColor = "rgba(200, 0, 0, 0.7)";
          break;
        default:
          // status.backgroundColor = "rgba(210, 210, 210, 0.7)"
          // status.backgroundColor = "rgba(192, 192, 192, 0.7)";
          status.backgroundColor = "rgba(227, 227, 227, 1)";
      }

      srmStatus == "10"
        ? (status.backgroundColor = "rgba(0, 215, 0, 0.7)")
        : (status.backgroundColor = "rgba(160, 160, 160, 0.7)");

      if (overHour === true) status.backgroundColor = "rgba(249, 141, 59, 1)";

      if (navError === true) status.backgroundColor = "rgba(200, 0, 0, 0.7)";

      response.send(status);

      // Mode
      // 0	undefined
      // 10	automatic
      // 20	semi auto
      // 30	jog mode main axis active
      // 31	jog mode LHD active
      // 32	cyclic run mode LHD active
      // 40	teach-in
      // 50	relieve
      // 60	operation locally
      // 61	preselection operation locally
      // 62	access error
      // 70	automatic off
      // 71	auto off (Auto key)
      // 72	auto off (MFS)
      // 73	auto off (Master key)
      // 80	start up automatic
      // 81	start up semi-automatic
      // 8F	shut down
      // 90	emergency exit
      // A0	fire alarm
      // A1	braketest X
      // A2	braketest Y
      // B0	collision control
      // BF	service zone
      // F0	reference
      // F1	reference main axis
      // F2	reference LHD
      // F3	home run
      // F4	reference x-axis
      // F5	reference y-axis
      // F6	auto reference
      // F7	lubrication pump
      // F8	brake test
      // F9	prepare for shutdown
      // FE	version conflict
      // FF	no communication

      // SRM Status
      // 0	Home positioning
      // 1	Home position
      // 2	Semi automatic is on
      // 3	Waiting for Order
      // 4	Warning active
      // 5	In service position
      // 6	collision sensor
      // 7	LHD1 Safety OK
      // 8	LHD2 Safety OK
      // 9	Reference cycle
      // 10	Reference position

      // Status X
      // 0	Movement active
      // 1	Pass release
      // 2	Release
      // 3	Waiting for action
      // 4	Referenced
      // 5	Waiting for reference release
      // 6	Waiting for reference position release
      // 7	Waiting for home position release
      // 8	Waiting for emcy exit position release
      // 9	Waiting for fire alarm position release
      // 10	Reference mode active
      // 11	At reference position
      // 12	At pos after reference
      // 13	At Homeposition
      // 14	At release position

      // Status Y
      // 0	Movement active
      // 1	in safe pos up
      // 2	in safe pos down
      // 3	Release
      // 4	Waiting for action
      // 5	Referenced
      // 6	Waiting for reference release
      // 7	Waiting for home position release
      // 8	Waiting for emcy exit position release
      // 9	Waiting for fire alarm position release
      // 10	Reference mode active
      // 11	At reference position
      // 12	At Homeposition

      // System Status1
      // 0	Aisle security not available
      // 2	Waiting for follow-up order
      // 3	Waiting for fork clearing
      // 6	long term blocking
      // 7	maintenance block

      // System Status2
      // 0	Automatic is on
      // 1	LHD 1 disabled
      // 2	LHD 2 disabled
      // 5	Fire alarm
      // 6	Error
      // 7	Emergency Stop

      // System Status3
      // 0	Access to Lift requested
      // 1	Access to Lift granted by MFS
      // 2	Navette AUTO locked by MFS

      // System Status4

      // Status LSD1
      // 0	place 1 occupied
      // 1	place 2 occupied
      // 5	big TU
      // 6	Waiting for fork clearing
      // 7	occupancy info valid

      // Status LSD2
      // 0	place 1 occupied
      // 1	place 2 occupied
      // 5	big TU
      // 6	Waiting for fork clearing
      // 7	occupancy info valid
    } else {
      response.send("SOMETHINGS WRONG");
    }
  })
);

module.exports = Router;
