const express = require('express');
const router = express.Router();
const fileController = require('../controllers/fileController');
const imageUpload = require('../middleware/upload');


router.post("/", imageUpload.single('image'), fileController.upload);
router.get("/list", fileController.getListFiles);
router.get("/files/:name", fileController.download);


module.exports = router;


