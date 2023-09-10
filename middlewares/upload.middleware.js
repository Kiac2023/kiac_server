const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.fieldname === "id_passport" &&
    !file.mimetype.match(/jpeg|jpg|png|pdf/)
  ) {
    return cb(
      new Error("Only jpg, jpeg, and png files are allowed for id_passport!"),
      false
    );
  }
  if (
    file.fieldname === "transcript" &&
    !file.mimetype.match(/jpeg|jpg|png|pdf/)
  ) {
    return cb(
      new Error(
        "Only jpg, jpeg, png, and pdf files are allowed for transcript!"
      ),
      false
    );
  }
  cb(null, true);
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // Limit to 5MB
  },
});

module.exports = upload;
