import multer from "multer";
import fs  from 'fs';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = 'public/temp';
    // Create directory if it doesn't exist
    fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })
  
 export const upload = multer({ storage: storage })