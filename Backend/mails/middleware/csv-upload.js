const multer = require('multer'); //to upload files

const storage = multer.diskStorage({ // nonvolatile , if in memory can crash it
  destination: 'uploads/',
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); //uniquely identifyable files locally as wid same names files will be overridden
  }
});

module.exports = multer({ storage });
