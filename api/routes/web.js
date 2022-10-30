const express = require("express");
const router = express.Router();
const homeController = require("../controllers/home");
const galleryController = require("../controllers/GalleryController");
const uploader = require("../middleware/uploader");

let routes = (app) => {
  router.get("/", homeController.getHome);

  router.post("/upload", uploader.single("file"), galleryController.uploadFiles);

  router.get("/images", galleryController.getPictures);

  router.delete("/image/:name", galleryController.deletePicture);

  router.patch("/markStarred/:name", galleryController.markStarred);

  return app.use("/", router);
};

module.exports = routes;
