import makeBuildImageHandler from './image-handler';
import fse from 'fs-extra';
import { join } from 'path';
import { IdHandler, ImageHandler } from '../../utilities/types';

describe('image-handler', () => {
  let imageHandler: ImageHandler;

  beforeAll(() => {
    const mockIdHandler: IdHandler = {
      getId: jest.fn(() => 'mockId'),
      isValid: jest.fn()
    };

    const buildImageHandler = makeBuildImageHandler({
      idHandler: mockIdHandler
    });

    imageHandler = buildImageHandler();
  });

  test('should create new file in `/public/images` directory when exports succeed', async () => {
    // given
    const mockEncodedImage = await fse.readFile('./mock-encoded-image', 'utf8');

    // when
    const result = await imageHandler.exports(mockEncodedImage);

    const isExist = await fse.pathExists(
      join(process.cwd(), 'public', 'images', result)
    );

    // expect
    expect(isExist).toBe(true);
  });
});
