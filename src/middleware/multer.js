import fs from "fs";
import multer from "multer";


const fileStorageEngine = multer.diskStorage({
  destination: function (req, file, cb) {
    let uploadPath = req.query.uploadPath;
    uploadPath = `./${uploadPath}`;
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, {
        recursive: true,
      });
    }
    cb(null, `${folderPath}/`);
  },

  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: fileStorageEngine });

module.exports = upload;
