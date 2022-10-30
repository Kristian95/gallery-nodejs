const fs = require("fs");
const functoins = require("../utls/functions");

const db = require("../models");
const { or } = require("sequelize");
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
      const { page, size } = request.query;

      const { limit, offset } = functoins.getPagination(page, size);

      const images = await image.findAll({
        order: [
          ['createdAt', 'DESC']
        ],
        limit: limit,
        offset: offset
      });

      return images;

  } catch (error) {
    return response.send(`Error when trying getting picutes: ${error}`);
  }
};

const deletePicture = async (request, response) => {
  try {
    const fileName = request.params.name;
    const directoryPath = __basedir + "/resources/images/";

    fs.unlink(directoryPath + fileName, (error) => {
      if (error) {
        response.status(500).send({
          message: "Could not delete the file. " + error,
        });
      }
    });

    await image.destroy({
      where: {
        name: fileName
      }
    });

    response.status(200).send({
      message: "Image is deleted successfully",
    });
} catch (error) {
  return response.send(`Error when trying to remove image: ${error}`);
}};

const markStarred = async (requet, response) => {
  try {
    const fileName = request.params.name;

    const result = await image.update(
      { starred: 1},
      { where: { name: fileName }
    });

    return response.send(`File has been updated successfully.`);
  } catch (error) {
    return response.send(`Error when trying to update image: ${error}`);
  }};

module.exports = {
  uploadFiles,
  getPictures,
  deletePicture,
  markStarred
};
