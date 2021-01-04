import { RequestHandler } from 'express';
import multer, { DiskStorageOptions } from 'multer';
import { join } from 'path';
import fse from 'fs-extra';
import { IdHandler } from '../types';

export default function buildMakeExportImage(dependencies: {
    directoryPath: string[],
    idHandler: IdHandler
}) {
  return function makeExportImage(fieldName: string): RequestHandler {
    const dirPath = join(...dependencies.directoryPath);

    const diskStorageOpt: DiskStorageOptions = {
      destination: (req, file, cb) => {
        fse.ensureDirSync(dirPath);
        cb(null, dirPath);
      },
      filename: (req, file, cb) => {
        cb(null, 'IMG_' + dependencies.idHandler.getId() + '.jpeg');
      }
    };

    const diskStorage = multer.diskStorage(diskStorageOpt);

    const exportImage = multer({
      storage: diskStorage,
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
