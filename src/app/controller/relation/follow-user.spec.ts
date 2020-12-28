import makeFollowUser from './follow-user';
import {
  FollowUserRequestBody,
  VerifyTokenService,
  FollowUserService,
  QueryUserProfile,
  GetUserProfileService,
  UpdateUserProfileService
} from '../../utilities/types';
import { Request } from 'express';
import { ForbiddenError } from '../../utilities/http-error';

describe('follow-user-controller', () => {
  const mockFollowerId = 'mockFollowerId';
  const mockFollowerUserName = 'mockFollowingUserName';
  const mockFollowerAlias = 'mockFollowingAlias';
  const mockFollowerDes = 'mockFollowingDes';
  const mockFollowerPostNum = 0;
  const mockFollowerFollowerNum = 1;
  const mockFollowerFollowingNum = 2;

  const mockFollowingId = 'mockFollowingId';
  const mockFollowingUserName = 'mockFollowingUserName';
  const mockFollowingAlias = 'mockFollowingAlias';
  const mockFollowingDes = 'mockFollowingDes';
  const mockFollowingPostNum = 0;
  const mockFollowingFollowerNum = 1;
  const mockFollowingFollowingNum = 2;

  test('should throw UnauthorizedError when tokenUserId is not compatible with followerId', async () => {
    // given
    const shouldNotTobeCalled = jest.fn();

    const mockRequest = ({
      headers: {
        authorization: 'mockAuth'
      },
      body: {
        followerId: mockFollowerId,
        followingId: mockFollowingId
      } as FollowUserRequestBody
    } as unknown) as Request;

    const mockTokenId = 'mockTokenId';

    const verifyTokenService: VerifyTokenService = jest.fn(() => mockTokenId);

    const followUserService: FollowUserService = jest.fn();

    const getUserProfileByIdService: GetUserProfileService = jest.fn();

    const updateUserProfileService: UpdateUserProfileService = jest.fn();

    const followUser = makeFollowUser({
      verifyTokenService,
      followUserService,
      getUserProfileByIdService,
      updateUserProfileService
    });

    // when
    try {
      await followUser(mockRequest);
      shouldNotTobeCalled();
    } catch (e) {
      expect(e).toBeInstanceOf(ForbiddenError);
    } finally {
      expect(shouldNotTobeCalled).not.toBeCalled();
    }
  });

  test('should return correct result when invoke successfully', async () => {
    // given
    const mockRequest = ({
      headers: {
        authorization: 'mockAuth'
      },
      body: {
        followerId: mockFollowerId,
        followingId: mockFollowingId
      } as FollowUserRequestBody
    } as unknown) as Request;

    const mockTokenId = 'mockFollowerId';

    const verifyTokenService: VerifyTokenService = jest.fn(() => mockTokenId);

    const mockUpatedFollowings: QueryUserProfile[] = [
      {
        getId: jest.fn(() => mockFollowingId),
        getUserName: jest.fn(() => mockFollowingUserName),
        getAlias: jest.fn(() => mockFollowingAlias),
        getDescription: jest.fn(() => mockFollowingDes),
        getImageSrc: jest.fn(() => null),
        getPostNum: jest.fn(() => mockFollowingPostNum),
        getFollowerNum: jest.fn(() => mockFollowingFollowerNum),
        getFollowingNum: jest.fn(() => mockFollowingFollowingNum)
      }
    ];

    const followUserService: FollowUserService = jest.fn(() =>
      Promise.resolve(mockUpatedFollowings)
    );

    const getUserProfileByIdService: GetUserProfileService = jest.fn(
      (id: string) => {
        if (id === mockFollowingId) {
          return Promise.resolve({
            getId: jest.fn(() => mockFollowingId),
            getUserName: jest.fn(() => mockFollowingUserName),
            getAlias: jest.fn(() => mockFollowingAlias),
            getDescription: jest.fn(() => mockFollowingDes),
            getImageSrc: jest.fn(() => null),
            getPostNum: jest.fn(() => mockFollowingPostNum),
            getFollowerNum: jest.fn(() => mockFollowingFollowerNum),
            getFollowingNum: jest.fn(() => mockFollowingFollowingNum)
          });
        } else {
          return Promise.resolve({
            getId: jest.fn(() => mockFollowerId),
            getUserName: jest.fn(() => mockFollowerUserName),
            getAlias: jest.fn(() => mockFollowerAlias),
            getDescription: jest.fn(() => mockFollowerDes),
            getImageSrc: jest.fn(() => null),
            getPostNum: jest.fn(() => mockFollowerPostNum),
            getFollowerNum: jest.fn(() => mockFollowerFollowerNum),
            getFollowingNum: jest.fn(() => mockFollowerFollowingNum)
          });
        }
      }
    );

    const updateUserProfileService: UpdateUserProfileService = jest.fn();

    const followUser = makeFollowUser({
      verifyTokenService,
      followUserService,
      getUserProfileByIdService,
      updateUserProfileService
    });

    // when
    const result = await followUser(mockRequest);

    // expect
    expect(result.headers).toStrictEqual({
      'Content-Type': 'application/json'
    });
    expect(result.status).toBe(201);
    result.body.followings.forEach((userProfile, index) => {
      expect(userProfile).toStrictEqual({
        id: mockFollowingId,
        userName: mockFollowingUserName,
        alias: mockFollowingAlias,
        description: mockFollowingDes,
        imageSrc: null,
        postNum: mockFollowingPostNum,
        followerNum: mockFollowingFollowerNum,
        followingNum: mockFollowingFollowingNum
      });
    });

    expect(updateUserProfileService).toBeCalledTimes(2);
  });
});
