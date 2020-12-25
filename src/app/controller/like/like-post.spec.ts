import makeLikePost from './like-post';
import { Request } from 'express';
import {
  LikePostRequestBody,
  LikePostService,
  QueryUserProfile,
  VerifyTokenService
} from '../../utilities/types';
import { ForbiddenError } from '../../utilities/http-error';

describe('like-post-controller', () => {
  test('should throw an UnauthorizedError when tokenUserId is not compatible with userId in req.body', async () => {
    // given
    const shouldNotBeCalled = jest.fn();

    const mockReq = ({
      headers: {
        authorization: 'mockAuth'
      },
      body: {
        userId: 'mockBodyUserId',
        postId: 'mockPostId'
      } as LikePostRequestBody
    } as unknown) as Request;

    const verifyTokenService: VerifyTokenService = jest.fn(() => 'mockTokenId');

    const likePostService: LikePostService = jest.fn();

    const likePost = makeLikePost({ verifyTokenService, likePostService });

    // when
    try {
      await likePost(mockReq);
      shouldNotBeCalled();
    } catch (e) {
      expect(e).toBeInstanceOf(ForbiddenError);
    } finally {
      expect(shouldNotBeCalled).not.toBeCalled();
    }
  });

  test('should trigger likePostService and return correct result when invoke successfully', async () => {
    // given
    const shouldNotBeCalled = jest.fn();

    const mockUserId = 'mockUserId';
    const mockPostId = 'mockPostId';
    const mockUserName = 'mockUserName';
    const mockAlias = 'mockAlias';
    const mockDes = 'mockDes';
    const mockImgSrc = ' mockImgSrc';
    const mockPostNum = 0;
    const mockFollowerNum = 0;
    const mockFollowingNum = 0;

    const mockReq = ({
      headers: {
        authorization: 'mockAuth'
      },
      body: {
        userId: mockUserId,
        postId: mockPostId
      } as LikePostRequestBody
    } as unknown) as Request;

    const verifyTokenService: VerifyTokenService = jest.fn(() => mockUserId);

    const mockQueryUserProfile: QueryUserProfile = {
      getId: jest.fn(() => mockUserId),
      getUserName: jest.fn(() => mockUserName),
      getAlias: jest.fn(() => mockAlias),
      getDescription: jest.fn(() => mockDes),
      getImageSrc: jest.fn(() => mockImgSrc),
      getPostNum: jest.fn(() => mockPostNum),
      getFollowerNum: jest.fn(() => mockFollowerNum),
      getFollowingNum: jest.fn(() => mockFollowingNum)
    };

    const mockLikedUsers = [mockQueryUserProfile];

    const likePostService: LikePostService = jest.fn(() =>
      Promise.resolve(mockLikedUsers)
    );

    const likePost = makeLikePost({ verifyTokenService, likePostService });

    // when
    const result = await likePost(mockReq);

    // expect
    expect(likePostService).toBeCalledTimes(1);
    expect(result.headers).toStrictEqual({
      'Content-Type': 'application/json'
    });
    expect(result.status).toBe(201);

    result.body.likedUsers.forEach((userProfile, index) => {
      const fromUserProfile = mockLikedUsers[index];

      expect(userProfile.id).toBe(fromUserProfile.getId());
      expect(userProfile.userName).toBe(fromUserProfile.getUserName());
      expect(userProfile.alias).toBe(fromUserProfile.getAlias());
      expect(userProfile.description).toBe(fromUserProfile.getDescription());
      expect(userProfile.imageSrc).toBe(fromUserProfile.getImageSrc());
      expect(userProfile.postNum).toBe(fromUserProfile.getPostNum());
      expect(userProfile.followerNum).toBe(fromUserProfile.getFollowerNum());
      expect(userProfile.followingNum).toBe(fromUserProfile.getFollowingNum());
    });
  });
});
