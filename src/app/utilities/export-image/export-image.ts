import { RequestHandler } from 'express';
import multer from 'multer';

export default function buildMakeExportImage() {
  return function makeExportImage(fieldName: string): RequestHandler {
    const storage = multer.memoryStorage();

    const exportImage = multer({
      storage,
      limits: {
        fileSize: 1024 * 1024 * 5 // 5MB
      },
      fileFilter: (req, file, cb) => {
        if (file.mimetype === 'image/jpeg') {
          cb(null, true);
        } else {
          cb(null, false);
        }
      }
    });
    return exportImage.single(fieldName);
  };
}
