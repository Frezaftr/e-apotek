import multer from 'multer';
import path from 'path';

// Konfigurasi penyimpanan file
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${uniqueSuffix}${path.extname(file.originalname)}`);
  },
});

// Filter untuk hanya menerima gambar
const fileFilter = (req, file, cb) => {
  const fileTypes = /jpg|jpeg|png/;
  const isExtValid = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const isMimeValid = fileTypes.test(file.mimetype);

  if (isExtValid && isMimeValid) {
    cb(null, true);
  } else {
    cb(new Error('Hanya file gambar yang diizinkan (jpg, jpeg, png)'));
  }
};

const upload = multer({ storage, fileFilter });

export default upload;
