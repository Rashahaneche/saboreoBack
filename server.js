const cors = require("cors");
const express = require("express");
const appserv = express();

global.__basedir = __dirname;

var corsOptions = {
  origin: "http://localhost:3000"
};

appserv.use(cors(corsOptions));

const initRoutes = require("./routes/fileRouter");

appserv.use(express.urlencoded({ extended: true }));
initRoutes(appserv);

let port = 3000;
appserv.listen(port, () => {
  console.log(`Running at localhost:${port}`);
});