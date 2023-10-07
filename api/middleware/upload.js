const multer = require("multer");
const path=require("path");

const storage = multer.diskStorage({
  destination: "./uploads",
  filename: function (req, file, cb) {
    let name = `Image-${Date.now()}${path.extname(file.originalname)}`;
    cb(null, name);
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
