const path = require("path")
const multer = require("multer")
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "/uploads");
  },

  // By default, multer removes file extensions so let's add them back
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
  },
});
const imageFilter = function (req, file, cb) {
  // Accept images only
  if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
    req.fileValidationError = "Only image files are allowed!";
    return cb(new Error("Only image files are allowed!"), false);
  }
  cb(null, true);
};
module.exports = {
  upload(file) {    
    return new Promise(() => {
      let upload = multer({ storage: storage, fileFilter: imageFilter }).single("profile_pic");

      debugger

      // if (!file) {
      //   reject(false);
      // } else if (err instanceof multer.MulterError) {
      //   return res.send(err);
      // } else if (err) {
      //   return res.send(err);
      // }
    });
    // req.file contains information of uploaded file
    // req.body contains information of text fields, if there were any
  },
};
