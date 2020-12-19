import makeGetLikedUsers from './get-liked-users';
import { Request } from 'express';
import {
  GetLikedUserListService,
  QueryUserProfile
} from '../../utilities/types';

describe('get-liked-users-controller', () => {
  test('should trigger getLikedUserListService and return correct result when invoke successfully', async () => {
    // given
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
      query: {
        postId: mockPostId
      }
    } as unknown) as Request;

    const mockLikedUsers: QueryUserProfile[] = [
      {
        getId: jest.fn(() => mockUserId),
        getUserName: jest.fn(() => mockUserName),
        getAlias: jest.fn(() => mockAlias),
        getDescription: jest.fn(() => mockDes),
        getImageSrc: jest.fn(() => mockImgSrc),
        getPostNum: jest.fn(() => mockPostNum),
        getFollowerNum: jest.fn(() => mockFollowerNum),
        getFollowingNum: jest.fn(() => mockFollowingNum)
      }
    ];

    const getLikedUserListService: GetLikedUserListService = jest.fn(() =>
      Promise.resolve(mockLikedUsers)
    );

    const getLikedUsers = makeGetLikedUsers({ getLikedUserListService });

    // when
    const result = await getLikedUsers(mockReq);

    // expect
    expect(getLikedUserListService).toBeCalledTimes(1);
    expect(result.headers).toStrictEqual({
      'Content-Type': 'application/json'
    });
    expect(result.status).toBe(200);

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
