import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: "./uploads",
  filename: function (req, file, cb) {
    let name = `Image-${Date.now()}${path.extname(file.originalname)}`;
    cb(null, name);
  },
});

const upload = multer({ storage: storage });

export default upload;
