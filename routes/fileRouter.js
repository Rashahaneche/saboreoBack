const express = require("express");
const router = express.Router();
const controller = require("../controllers/fileController");

let routes = (appserv) => {
  router.post("/upload", controller.upload);
  router.get("/files", controller.getListFiles);
  router.get("/files/:name", controller.download);

  appserv.use(router);
};

module.exports = routes;