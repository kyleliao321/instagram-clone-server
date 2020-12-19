import { IdHandler } from '../../utilities/types';
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

    const buildNewPost = makeBuildNewPost({
      postIdHandler: mockPostIdHandler,
      userIdHandler: mockUserIdHandler
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

    const buildNewPost = makeBuildNewPost({
      postIdHandler: mockPostIdHandler,
      userIdHandler: mockUserIdHandler
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
});
