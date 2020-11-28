import { Request } from 'express';
import { NoContentError } from '../utilities/http-errors';
import { GetUserProfileService, QueryUserProfile } from '../utilities/types';
import makeGetUserProfile from './get-user-profile';

describe('get user profile controller', () => {
  test('should response with status code 500 when getUserProfileById throw a non-http-error', async () => {
    // given
    const mockUserId = 'mockUserId';

    const mockRequest = {
      body: {
        userId: mockUserId
      }
    } as Request;

    const mockGetUserProfileById: GetUserProfileService = jest.fn(() => {
      throw new Error();
    });

    const getUserProfile = makeGetUserProfile({
      getUserProfileById: mockGetUserProfileById
    });

    // when
    const rep = getUserProfile(mockRequest);

    // expect
    expect(rep).resolves.toStrictEqual({
      headers: {
        'Content-Type': 'application/json'
      },
      status: 500
    });
  });

  test('should response with correct status code when getUserProfileById throw a http-error', async () => {
    // given
    const mockUserId = 'mockUserId';

    const mockRequest = {
      body: {
        userId: mockUserId
      }
    } as Request;

    const mockGetUserProfileById: GetUserProfileService = jest.fn(() => {
      throw new NoContentError();
    });

    const getUserProfile = makeGetUserProfile({
      getUserProfileById: mockGetUserProfileById
    });

    // when
    const rep = getUserProfile(mockRequest);

    // expect
    expect(rep).resolves.toStrictEqual({
      headers: {
        'Content-Type': 'application/json'
      },
      status: NoContentError.STATUS_CODE
    });
  });

  test('should response with correct status and body when getUserProfileById invoke successfully', async () => {
    // given
    const mockUserId = 'mockUserId';
    const mockUserName = 'mockUserName';
    const mockAlias = 'mockAlias';
    const mockDescription = 'mockDescription';
    const mockImageSrc = 'mockImageSrc';
    const mockPostNum = 0;
    const mockFollowerNum = 0;
    const mockFolloingNum = 0;

    const mockRequest = {
      body: {
        userId: mockUserId
      }
    } as Request;

    const queryUserProfile: QueryUserProfile = {
      getId: () => mockUserId,
      getUserName: () => mockUserName,
      getAlias: () => mockAlias,
      getDescription: () => mockDescription,
      getImageSrc: () => mockImageSrc,
      getPostNum: () => mockPostNum,
      getFollowerNum: () => mockFollowerNum,
      getFollowingNum: () => mockFolloingNum
    };

    const mockGetUserProfileById: GetUserProfileService = jest.fn(() =>
      Promise.resolve(queryUserProfile)
    );

    const getUserProfile = makeGetUserProfile({
      getUserProfileById: mockGetUserProfileById
    });

    // when
    const rep = getUserProfile(mockRequest);

    // expect
    expect(rep).resolves.toStrictEqual({
      headers: {
        'Content-Type': 'application/json'
      },
      status: 200,
      body: {
        id: mockUserId,
        userName: mockUserName,
        alias: mockAlias,
        description: mockDescription,
        imageSrc: mockImageSrc,
        postNum: mockPostNum,
        followerNum: mockFollowerNum,
        followingNum: mockFolloingNum
      }
    });
  });
});
