import { IdHandler, ImageHandler } from '../../utilities/types';
import makeBuildQueryUserProfile from './query-user-profile';

describe('fetched user profile', () => {
  test('should throw an error when user id is not valid', () => {
    // given
    const mockId = 'mockId';
    const mockUserName = 'mockUserName';
    const mockAlias = 'mockAlias';
    const mockDescription = 'mockDes';
    const mockImageSrc = 'mockImageSrc';
    const mockPostNum = 0;
    const mockFollowerNum = 0;
    const mockFollowingNum = 0;

    const mockIdHandler: IdHandler = {
      isValid: jest.fn(() => false),
      getId: jest.fn()
    };

    const mockImageHandler: ImageHandler = {
      isValid: jest.fn()
    };

    const buildQueryUserProfile = makeBuildQueryUserProfile({
      idHandler: mockIdHandler,
      imageHandler: mockImageHandler
    });

    // when
    expect(() => {
      buildQueryUserProfile({
        id: mockId,
        userName: mockUserName,
        alias: mockAlias,
        description: mockDescription,
        imageSrc: mockImageSrc,
        postNum: mockPostNum,
        followerNum: mockFollowerNum,
        followingNum: mockFollowingNum
      });
    }).toThrow('Fetched User Profile must have a valid user id.');
  });

  test('should throw an error when imageSrc is not valid', () => {
    // given
    const mockId = 'mockId';
    const mockUserName = 'mockUserName';
    const mockAlias = 'mockAlias';
    const mockDescription = 'mockDes';
    const mockImageSrc = 'mockImageSrc';
    const mockPostNum = 0;
    const mockFollowerNum = 0;
    const mockFollowingNum = 0;

    const mockIdHandler: IdHandler = {
      isValid: jest.fn(() => true),
      getId: jest.fn()
    };

    const mockImageHandler: ImageHandler = {
      isValid: jest.fn(() => false)
    };

    const buildQueryUserProfile = makeBuildQueryUserProfile({
      idHandler: mockIdHandler,
      imageHandler: mockImageHandler
    });

    // when
    expect(() => {
      buildQueryUserProfile({
        id: mockId,
        userName: mockUserName,
        alias: mockAlias,
        description: mockDescription,
        imageSrc: mockImageSrc,
        postNum: mockPostNum,
        followerNum: mockFollowerNum,
        followingNum: mockFollowingNum
      });
    }).toThrow('Fetched User Profile must have a valid file path.');
  });

  test('should throw an error when posts is negtive number', () => {
    // given
    const mockId = 'mockId';
    const mockUserName = 'mockUserName';
    const mockAlias = 'mockAlias';
    const mockDescription = 'mockDes';
    const mockImageSrc = 'mockImageSrc';
    const mockPostNum = -1;
    const mockFollowerNum = 0;
    const mockFollowingNum = 0;

    const mockIdHandler: IdHandler = {
      isValid: jest.fn(() => true),
      getId: jest.fn()
    };

    const mockImageHandler: ImageHandler = {
      isValid: jest.fn(() => true)
    };

    const buildQueryUserProfile = makeBuildQueryUserProfile({
      idHandler: mockIdHandler,
      imageHandler: mockImageHandler
    });

    // when
    expect(() => {
      buildQueryUserProfile({
        id: mockId,
        userName: mockUserName,
        alias: mockAlias,
        description: mockDescription,
        imageSrc: mockImageSrc,
        postNum: mockPostNum,
        followerNum: mockFollowerNum,
        followingNum: mockFollowingNum
      });
    }).toThrow(
      'Fetched User Profile must have a positive or at least zero posts.'
    );
  });

  test('should throw an error when followers is negtive number', () => {
    // given
    const mockId = 'mockId';
    const mockUserName = 'mockUserName';
    const mockAlias = 'mockAlias';
    const mockDescription = 'mockDes';
    const mockImageSrc = 'mockImageSrc';
    const mockPostNum = 0;
    const mockFollowerNum = -1;
    const mockFollowingNum = 0;

    const mockIdHandler: IdHandler = {
      isValid: jest.fn(() => true),
      getId: jest.fn()
    };

    const mockImageHandler: ImageHandler = {
      isValid: jest.fn(() => true)
    };

    const buildQueryUserProfile = makeBuildQueryUserProfile({
      idHandler: mockIdHandler,
      imageHandler: mockImageHandler
    });

    // when
    expect(() => {
      buildQueryUserProfile({
        id: mockId,
        userName: mockUserName,
        alias: mockAlias,
        description: mockDescription,
        imageSrc: mockImageSrc,
        postNum: mockPostNum,
        followerNum: mockFollowerNum,
        followingNum: mockFollowingNum
      });
    }).toThrow(
      'Fetched User Profile must have a positive or at least zero followers.'
    );
  });

  test('should throw an error when followings is negtive number', () => {
    // given
    const mockId = 'mockId';
    const mockUserName = 'mockUserName';
    const mockAlias = 'mockAlias';
    const mockDescription = 'mockDes';
    const mockImageSrc = 'mockImageSrc';
    const mockPostNum = 0;
    const mockFollowerNum = 0;
    const mockFollowingNum = -1;

    const mockIdHandler: IdHandler = {
      isValid: jest.fn(() => true),
      getId: jest.fn()
    };

    const mockImageHandler: ImageHandler = {
      isValid: jest.fn(() => true)
    };

    const buildQueryUserProfile = makeBuildQueryUserProfile({
      idHandler: mockIdHandler,
      imageHandler: mockImageHandler
    });

    // when
    expect(() => {
      buildQueryUserProfile({
        id: mockId,
        userName: mockUserName,
        alias: mockAlias,
        description: mockDescription,
        imageSrc: mockImageSrc,
        postNum: mockPostNum,
        followerNum: mockFollowerNum,
        followingNum: mockFollowingNum
      });
    }).toThrow(
      'Fetched User Profile must have a positive or at least zero followings.'
    );
  });
});
