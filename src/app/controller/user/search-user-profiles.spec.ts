import makeSearchUserProfiles from './search-user-profiles';
import { Request } from 'express';
import {
  GetUserProfileListService,
  QueryUserProfile
} from '../../utilities/types';

describe('search-user-profiles-controller', () => {
  test('should return correct result when getUserProfileListService return non-empty-array', async () => {
    // given
    const mockUserName = 'mockUserName';

    const mockRequest = ({
      query: {
        userName: mockUserName
      }
    } as unknown) as Request;

    const mockUserProfiles: QueryUserProfile[] = [
      {
        getId: jest.fn(() => 'mocId'),
        getUserName: jest.fn(() => mockUserName),
        getAlias: jest.fn(() => 'mockAlias'),
        getDescription: jest.fn(() => 'mockes'),
        getPostNum: jest.fn(() => 0),
        getFollowerNum: jest.fn(() => 0),
        getFollowingNum: jest.fn(() => 0),
        getImageSrc: jest.fn(() => null)
      }
    ];

    const mockGetUserProfileListService: GetUserProfileListService = jest.fn(
      () => Promise.resolve(mockUserProfiles)
    );

    const searchUserProfiles = makeSearchUserProfiles({
      getUserProfileListService: mockGetUserProfileListService
    });

    // when
    const result = await searchUserProfiles(mockRequest);

    // expect
    result.body.users.forEach((userProfile, index) => {
      const userProfileSrc = mockUserProfiles[index];
      expect(userProfile.id).toBe(userProfileSrc.getId());
      expect(userProfile.userName).toBe(userProfileSrc.getUserName());
      expect(userProfile.alias).toBe(userProfileSrc.getAlias());
      expect(userProfile.description).toBe(userProfileSrc.getDescription());
      expect(userProfile.imageSrc).toBe(userProfileSrc.getImageSrc());
      expect(userProfile.postNum).toBe(userProfileSrc.getPostNum());
      expect(userProfile.followerNum).toBe(userProfileSrc.getFollowerNum());
      expect(userProfile.followingNum).toBe(userProfileSrc.getFollowingNum());
    });
  });

  test('should return correct result when getUserProfileListService return empty-array', async () => {
    // given
    const mockUserName = 'mockUserName';

    const mockRequest = ({
      query: {
        userName: mockUserName
      }
    } as unknown) as Request;

    const mockUserProfiles: QueryUserProfile[] = [];

    const mockGetUserProfileListService: GetUserProfileListService = jest.fn(
      () => Promise.resolve(mockUserProfiles)
    );

    const searchUserProfiles = makeSearchUserProfiles({
      getUserProfileListService: mockGetUserProfileListService
    });

    // when
    const result = await searchUserProfiles(mockRequest);

    // expect
    expect(result.body.users.length).toBe(0);
  });
});
