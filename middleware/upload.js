import multer from "multer";
import path from "path";
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join("public", "image"));
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + ".png");
    },
  });
  
  const upload = multer({ storage: storage });

  export {upload}