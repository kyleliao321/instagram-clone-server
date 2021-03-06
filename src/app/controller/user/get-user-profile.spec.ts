import { Request } from 'express';
import { BadRequestError } from '../../utilities/http-error';
import { GetUserProfileService, QueryUserProfile } from '../../utilities/types';
import makeGetUserProfile from './get-user-profile';

describe('get user profile controller', () => {
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

    const mockRequest = ({
      params: {
        userId: 'mockUserId'
      },
      body: {
        userId: mockUserId
      }
    } as unknown) as Request;

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

    const mockGetUserProfileByIdService: GetUserProfileService = jest.fn(() =>
      Promise.resolve(queryUserProfile)
    );

    const getUserProfile = makeGetUserProfile({
      getUserProfileByIdService: mockGetUserProfileByIdService
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
        user: {
          id: mockUserId,
          userName: mockUserName,
          alias: mockAlias,
          description: mockDescription,
          imageSrc: mockImageSrc,
          postNum: mockPostNum,
          followerNum: mockFollowerNum,
          followingNum: mockFolloingNum
        }
      }
    });
  });
});
