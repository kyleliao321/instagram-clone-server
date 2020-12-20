import { IdHandler, ImageHandler } from '../../utilities/types';
import makeBuildNewPost from './new-post';

describe('new-post-domain-model', () => {
  test('should throw an error when generated post id is not valid', () => {
    // given
    const mockDes = 'mockDes';
    const mockLoc = 'mockLoc';
    const mockTis = 'mockTis';
    const mockEncodedImg = 'mockEncodedImg';
    const mockPostedUserId = 'mockPostedUserId';

    const mockPostIdHandler = ({
      getId: jest.fn(() => 'mockId'),
      isValid: jest.fn(() => false)
    } as unknown) as IdHandler;

    const mockUserIdHandler = ({} as unknown) as IdHandler;

    const mockImageHandler: ImageHandler = {
      exports: jest.fn(),
      isValid: jest.fn()
    };

    const buildNewPost = makeBuildNewPost({
      postIdHandler: mockPostIdHandler,
      userIdHandler: mockUserIdHandler,
      imageHandler: mockImageHandler
    });

    // given
    expect(() => {
      buildNewPost({
        description: mockDes,
        location: mockLoc,
        timestamp: mockTis,
        encodedImage: mockEncodedImg,
        postedUserId: mockPostedUserId
      });
    }).toThrow('New Post must have a valid post id.');
  });

  test('should throw an error when posted user id is not valid', () => {
    // given
    const mockDes = 'mockDes';
    const mockLoc = 'mockLoc';
    const mockTis = 'mockTis';
    const mockEncodedImg = 'mockEncodedImg';
    const mockPostedUserId = 'mockPostedUserId';

    const mockPostIdHandler = ({
      getId: jest.fn(() => 'mockId'),
      isValid: jest.fn(() => true)
    } as unknown) as IdHandler;

    const mockUserIdHandler = ({
      getId: jest.fn(() => 'mockId'),
      isValid: jest.fn(() => false)
    } as unknown) as IdHandler;

    const mockImageHandler: ImageHandler = {
      exports: jest.fn(),
      isValid: jest.fn()
    };

    const buildNewPost = makeBuildNewPost({
      postIdHandler: mockPostIdHandler,
      userIdHandler: mockUserIdHandler,
      imageHandler: mockImageHandler
    });

    // given
    expect(() => {
      buildNewPost({
        description: mockDes,
        location: mockLoc,
        timestamp: mockTis,
        encodedImage: mockEncodedImg,
        postedUserId: mockPostedUserId
      });
    }).toThrow('New Post must have a valid posted user id.');
  });

  test('getImageSrc should get file name is provided encode image is valid', async () => {
    // given
    const mockDes = 'mockDes';
    const mockLoc = 'mockLoc';
    const mockTis = 'mockTis';
    const mockEncodedImg = 'mockEncodedImg';
    const mockPostedUserId = 'mockPostedUserId';
    const mockFileName = 'mockFileName';

    const mockPostIdHandler = ({
      getId: jest.fn(() => 'mockId'),
      isValid: jest.fn(() => true)
    } as unknown) as IdHandler;

    const mockUserIdHandler = ({
      getId: jest.fn(() => 'mockId'),
      isValid: jest.fn(() => true)
    } as unknown) as IdHandler;

    const mockImageHandler: ImageHandler = {
      exports: jest.fn(() => Promise.resolve(mockFileName)),
      isValid: jest.fn()
    };

    const buildNewPost = makeBuildNewPost({
      postIdHandler: mockPostIdHandler,
      userIdHandler: mockUserIdHandler,
      imageHandler: mockImageHandler
    });

    // when
    const userProfile = buildNewPost({
      description: mockDes,
      location: mockLoc,
      timestamp: mockTis,
      encodedImage: mockEncodedImg,
      postedUserId: mockPostedUserId
    });

    const fileName = await userProfile.getImageSrc();

    // expect
    expect(fileName).toBe(mockFileName);
  });
});
