const multer = require("multer");

const imageValidator = (req, file, cb) => {
  const allowedFiles = ['png', 'jpeg', 'jpg', 'gif'];
  const fileExtension = file.originalname.slice(
    ((file.originalname.lastIndexOf('.') - 1) >>> 0) + 2
  );
  const allowedFileTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif'];
  if (!allowedFileTypes.includes(file.mimetype) || !allowedFiles.includes(fileExtension)) {
    cb("Please upload only images!", false);
  }

  cb(null, true);
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __basedir + "/api/resources/images/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-image-${file.originalname}`);
  },
});

var uploadFile = multer({
  storage: storage,
  fileFilter: imageValidator
});
module.exports = uploadFile;
