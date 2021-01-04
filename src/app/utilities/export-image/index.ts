import buildMakeExportImage from './export-image';
import { idHandler } from '../../infrastructure';

const env = process.env.NODE_ENV || 'development';

const dirPath = [process.cwd(), 'public', 'images', env];

const makeExportImage = buildMakeExportImage({
    directoryPath: dirPath,
    idHandler
});

export default makeExportImage;
