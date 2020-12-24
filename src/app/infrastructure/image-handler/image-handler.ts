import { IdHandler, ImageHandler } from '../../utilities/types';
import { join } from 'path';
import fse from 'fs-extra';

export default function makeBuildImageHandler(dependencies: {
  idHandler: IdHandler;
}): () => ImageHandler {
  const imageDirName = process.env.NODE_ENV || 'development';
  const defaultPaths = ['public', 'images', imageDirName];

  return function buildImageHandler(): ImageHandler {
    return Object.freeze({
      isValid,
      exports
    });

    /**
     * Valid file should exist in `/public/images` directory and be jpeg format.
     * @param filName Name of image file.
     */
    function isValid(filName: string): boolean {
      return isFileExist(filName) && isJpegFile(filName);
    }

    /**
     * Examine whether the given file name exists in `/public/images` directory or not.
     * @param filName Name of image file.
     */
    function isFileExist(filName: string): boolean {
      const fullPath = join(process.cwd(), ...defaultPaths, filName);
      return fse.pathExistsSync(fullPath);
    }

    /**
     * Examine whether the given file is jpeg format or not.
     * @param filName Name of image file.
     */
    function isJpegFile(filName: string): boolean {
      const stringArray = filName.split('.');

      if (stringArray.length <= 1) {
        return false;
      }

      const fileFormat = stringArray[stringArray.length - 1];

      return fileFormat === 'jpeg' || fileFormat === 'jpg';
    }

    /**
     * Exports encoded image as jpeg file in `/public/images` directory, and
     * return generated file name.
     * @param encodedImage Image data encoded as Base64 string.
     */
    async function exports(encodedImage: string): Promise<string> {
      if (!(await isJpegFormat(encodedImage))) {
        throw new Error('Can only exports as jpeg file.');
      }

      const fileName = 'IMG_' + dependencies.idHandler.getId() + '.jpeg';
      const filePath = join(process.cwd(), ...defaultPaths, fileName);

      const buf = Buffer.from(encodedImage, 'base64');

      await fse.outputFile(filePath, buf);

      return fileName;
    }

    /**
     * Examine whether given data is jpeg format or not.
     * @param encodedImage Image encoded as Base64 string.
     */
    async function isJpegFormat(encodedImage: string): Promise<boolean> {
      const hex = Buffer.from(encodedImage, 'base64').toString('hex');

      // only flags
      if (hex.length <= 8) {
        return false;
      }

      const beginFlag = hex.slice(0, 4);
      const endFlag = hex.slice(-4, hex.length);

      // Jpeg file should start with `0xffd8` and end with `0xffd9` in heximal format.
      return beginFlag === 'ffd8' && endFlag === 'ffd9';
    }
  };
}
