import makeBuildImageHandler from './image-handler';
import fse from 'fs-extra';
import { join } from 'path';
import { IdHandler, ImageHandler } from '../../utilities/types';

describe('image-handler', () => {
  const testFixturesRelativePaths = ['__test__', 'fixtures'];
  const mockEncodedImageFileName = 'mock-encoded-image';
  const mockImageFileName = 'mock-image.jpg';

  const mockNotExistFileName = 'mock-image-2.jpg';
  const mockNotJpegOrJpgFileName = 'mock-image';

  const assetsRelativePaths = ['public', 'images', 'test'];

  let imageHandler: ImageHandler;

  beforeAll(async () => {
    const mockIdHandler: IdHandler = {
      getId: jest.fn(() => 'mockId'),
      isValid: jest.fn()
    };

    const buildImageHandler = makeBuildImageHandler({
      idHandler: mockIdHandler
    });

    imageHandler = buildImageHandler();

    // copy mock-image.jpg into assets directory
    const srcPath = join(
      process.cwd(),
      ...testFixturesRelativePaths,
      mockImageFileName
    );
    const dstPath = join(
      process.cwd(),
      ...assetsRelativePaths,
      mockImageFileName
    );
    return await fse.copy(srcPath, dstPath);
  });

  afterAll(async () => {
    // clean up exported images
    const assetsPath = join(process.cwd(), ...assetsRelativePaths);
    return await fse.remove(assetsPath);
  });

  test('should create new file in assets directory when exports succeed', async () => {
    // given
    const mockEncodedImagePath = join(
      process.cwd(),
      ...testFixturesRelativePaths,
      mockEncodedImageFileName
    );
    const mockEncodedImage = await fse.readFile(mockEncodedImagePath, 'utf8');

    // when
    const result = await imageHandler.exports(mockEncodedImage);

    const isExist = await fse.pathExists(
      join(process.cwd(), ...assetsRelativePaths, result)
    );

    // expect
    expect(isExist).toBe(true);
  });

  test('should return correct result when given file is exist in assets directory and is jpg or jepg file', () => {
    // when
    const result = imageHandler.isValid(mockImageFileName);

    // expect
    expect(result).toBe(true);
  });

  test('should return correct result when given file is not exist in assets directory', () => {
    // when
    const result = imageHandler.isValid(mockNotExistFileName);

    // expect
    expect(result).toBe(false);
  });

  test('should return correct result when given file is not jpg or jepg file', () => {
    // when
    const result = imageHandler.isValid(mockNotJpegOrJpgFileName);

    // expect
    expect(result).toBe(false);
  });
});
