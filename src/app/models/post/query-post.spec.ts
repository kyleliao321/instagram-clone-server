import makeBuildQueryPost from './query-post';
import { IdHandler, ImageHandler } from '../../utilities/types';

describe('query-post-domain-model', () => {
  test('should throw an error when given post id is not valid', () => {
    // given
    const mockId = 'mockId';
    const mockDes = 'mockDes';
    const mockLoc = 'mockLoc';
    const mockTis = 'mockTis';
    const mockImgSrc = 'mockImgSrc';
    const mockPostedUserId = 'mockPostedUserId';

    const mockPostIdHandler = ({
      isValid: jest.fn(() => false)
    } as unknown) as IdHandler;

    const mockUserIdHandler = ({} as unknown) as IdHandler;

    const mockImageHandler = ({} as unknown) as ImageHandler;

    const buildQueryPost = makeBuildQueryPost({
      userIdHandler: mockUserIdHandler,
      postIdHandler: mockPostIdHandler,
      imageHandler: mockImageHandler
    });

    // when
    expect(() => {
      buildQueryPost({
        id: mockId,
        description: mockDes,
        location: mockLoc,
        timestamp: mockTis,
        imageSrc: mockImgSrc,
        postedUserId: mockPostedUserId
      });
    }).toThrow('Query Post must have a valid post id.');
  });

  test('should throw an error when given posted user id is not valid', () => {
    // given
    const mockId = 'mockId';
    const mockDes = 'mockDes';
    const mockLoc = 'mockLoc';
    const mockTis = 'mockTis';
    const mockImgSrc = 'mockImgSrc';
    const mockPostedUserId = 'mockPostedUserId';

    const mockPostIdHandler = ({
      isValid: jest.fn(() => true)
    } as unknown) as IdHandler;

    const mockUserIdHandler = ({
      isValid: jest.fn(() => false)
    } as unknown) as IdHandler;

    const mockImageHandler = ({} as unknown) as ImageHandler;

    const buildQueryPost = makeBuildQueryPost({
      userIdHandler: mockUserIdHandler,
      postIdHandler: mockPostIdHandler,
      imageHandler: mockImageHandler
    });

    // when
    expect(() => {
      buildQueryPost({
        id: mockId,
        description: mockDes,
        location: mockLoc,
        timestamp: mockTis,
        imageSrc: mockImgSrc,
        postedUserId: mockPostedUserId
      });
    }).toThrow('Query Post must have a valid posted user id.');
  });

  test('should throw an error when given posted user id is not valid', () => {
    // given
    const mockId = 'mockId';
    const mockDes = 'mockDes';
    const mockLoc = 'mockLoc';
    const mockTis = 'mockTis';
    const mockImgSrc = 'mockImgSrc';
    const mockPostedUserId = 'mockPostedUserId';

    const mockPostIdHandler = ({
      isValid: jest.fn(() => true)
    } as unknown) as IdHandler;

    const mockUserIdHandler = ({
      isValid: jest.fn(() => true)
    } as unknown) as IdHandler;

    const mockImageHandler = ({
      isValid: jest.fn(() => false)
    } as unknown) as ImageHandler;

    const buildQueryPost = makeBuildQueryPost({
      userIdHandler: mockUserIdHandler,
      postIdHandler: mockPostIdHandler,
      imageHandler: mockImageHandler
    });

    // when
    expect(() => {
      buildQueryPost({
        id: mockId,
        description: mockDes,
        location: mockLoc,
        timestamp: mockTis,
        imageSrc: mockImgSrc,
        postedUserId: mockPostedUserId
      });
    }).toThrow('Query Post must have a valid image source.');
  });

  test('should accept unknown location info', () => {
    // given
    const mockId = 'mockId';
    const mockDes = 'mockDes';
    const mockTis = 'mockTis';
    const mockImgSrc = 'mockImgSrc';
    const mockPostedUserId = 'mockPostedUserId';

    const mockPostIdHandler = ({
      isValid: jest.fn(() => true)
    } as unknown) as IdHandler;

    const mockUserIdHandler = ({
      isValid: jest.fn(() => true)
    } as unknown) as IdHandler;

    const mockImageHandler = ({
      isValid: jest.fn(() => true)
    } as unknown) as ImageHandler;

    const buildQueryPost = makeBuildQueryPost({
      userIdHandler: mockUserIdHandler,
      postIdHandler: mockPostIdHandler,
      imageHandler: mockImageHandler
    });

    // when
    const result = buildQueryPost({
      id: mockId,
      description: mockDes,
      timestamp: mockTis,
      imageSrc: mockImgSrc,
      postedUserId: mockPostedUserId
    });

    // expect
    expect(result.getId()).toBe(mockId);
    expect(result.getDescription()).toBe(mockDes);
    expect(result.getLocation()).toBe(null);
    expect(result.getTimeStamp()).toBe(mockTis);
    expect(result.getImageSrc()).toBe(mockImgSrc);
    expect(result.getPostedUserId()).toBe(mockPostedUserId);
  });
});
