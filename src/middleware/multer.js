// import fs from "fs";
import multer from "multer";


const fileStorageEngine = multer.diskStorage({
  destination:  (req, file, cb)=> {
    // let uploadPath = req.query.uploadPath;
    // uploadPath = `./${uploadPath}`;
    // if (!fs.existsSync(uploadPath)) {
    //   fs.mkdirSync(uploadPath, {
    //     recursive: true,
    //   });
    // }
    cb(null, './upload/');
  },

  filename: (req, file, cb) => {
    // console.log(file.originalname)
    cb(null, file.originalname);
  },

});
const upload = multer({ storage: fileStorageEngine });

module.exports = upload;
