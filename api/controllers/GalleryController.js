const fs = require("fs");

const db = require("../models");
const image = db.images;

const uploadFiles = async (request, response) => {
  try {
    if (request.file == undefined) {
      return response.send(`You must select a file.`);
    }

    const imagePath = __basedir + "/api/resources/images/";

    image.create({
      type: request.file.mimetype,
      name: request.file.originalname,
      path: imagePath,
      data: fs.readFileSync(
        imagePath + request.file.filename
      ),
    }).then((image) => {
      fs.writeFileSync(
        __basedir + "/api/resources/tmp/" + image.name,
        image.data
      );

      return response.send(`File has been uploaded.`);
    });
  } catch (error) {
    return response.send(`Error when trying upload images: ${error}`);
  }
};

const getPictures = async (request, response) => {
  try {
    if (request.file == undefined) {
      return response.send(`You must select a file.`);
    }

    image.create({
      type: request.file.mimetype,
      name: request.file.originalname,
      data: fs.readFileSync(
        __basedir + "/api/resources/images/" + request.file.filename
      ),
    }).then((image) => {
      fs.writeFileSync(
        __basedir + "/api/resources/tmp/" + image.name,
        image.data
      );

      return response.send(`File has been uploaded.`);
    });
  } catch (error) {
    return response.send(`Error when trying getting picutes: ${error}`);
  }
};

module.exports = {
  uploadFiles,
  getPictures
};
