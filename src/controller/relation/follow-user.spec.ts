import makeFollowUser from './follow-user';
import {
  FollowUserRequestBody,
  VerifyTokenService,
  FollowUserService,
  QueryUserProfile
} from '../../utilities/types';
import { Request } from 'express';
import { UnauthorizedError } from '../../utilities/http-error';

describe('follow-user-controller', () => {
  test('should throw UnauthorizedError when tokenUserId is not compatible with followerId', async () => {
    // given
    const shouldNotTobeCalled = jest.fn();

    const mockFollowerId = 'mockFollowerId';
    const mockFollowingId = 'mockFollowingId';

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

    const followUser = makeFollowUser({
      verifyTokenService,
      followUserService
    });

    // when
    try {
      await followUser(mockRequest);
      shouldNotTobeCalled();
    } catch (e) {
      expect(e).toBeInstanceOf(UnauthorizedError);
    } finally {
      expect(shouldNotTobeCalled).not.toBeCalled();
    }
  });

  test('should return correct result when invoke successfully', async () => {
    // given
    const mockFollowerId = 'mockFollowerId';
    const mockFollowingId = 'mockFollowingId';
    const mockFollowingUserName = 'mockFollowingUserName';
    const mockFollowingAlias = 'mockFollowingAlias';
    const mockFollowingDes = 'mockFollowingDes';
    const mockPostNum = 0;
    const mockFollowerNum = 1;
    const mockFollowingNum = 2;

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
        getPostNum: jest.fn(() => mockPostNum),
        getFollowerNum: jest.fn(() => mockFollowerNum),
        getFollowingNum: jest.fn(() => mockFollowingNum)
      }
    ];

    const followUserService: FollowUserService = jest.fn(() =>
      Promise.resolve(mockUpatedFollowings)
    );

    const followUser = makeFollowUser({
      verifyTokenService,
      followUserService
    });

    // when
    const result = await followUser(mockRequest);

    // expect
    expect(result.headers).toStrictEqual({
      'Content-Type': 'application/json'
    });
    expect(result.status).toBe(200);
    result.body.followings.forEach((userProfile, index) => {
      expect(userProfile).toStrictEqual({
        id: mockFollowingId,
        userName: mockFollowingUserName,
        alias: mockFollowingAlias,
        description: mockFollowingDes,
        imageSrc: null,
        postNum: mockPostNum,
        followerNum: mockFollowerNum,
        followingNum: mockFollowingNum
      });
    });
  });
});
