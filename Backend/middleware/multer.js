// middleware/multer.js
import multer from 'multer';
//import path from 'path';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public") // Better organized temp storage
  },
  filename: (req, file, cb) => {
 //   const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
   // const ext = path.extname(file.originalname);
    cb(null, file.originalname);
  }
});

/*const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only JPEG, PNG, and WEBP are allowed!'), false);
  }
};*/

const upload = multer({storage})

export default upload;