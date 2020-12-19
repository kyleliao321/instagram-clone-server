import {
  BuildQueryUserProfile,
  QueryUserProfile,
  UserRepository,
  UserProfile
} from '../../utilities/types';
import makeGetUserProfileByIdService from './get-user-profile-by-id';

describe('get-user-profile-by-id-service', () => {
  test('should return correct result when invoke successfully', async () => {
    // given
    const mockUserId = 'mockUserId';
    const mockUserName = 'mockUserName';
    const mockAlias = 'mockAlias';
    const mockDescription = 'mockDes';
    const mockImageSrc = 'mockImageSrc';
    const mockPostNum = 0;
    const mockFollowerNum = 0;
    const mockFollowingNum = 0;

    const mockUserProfile: UserProfile = {
      id: mockUserId,
      userName: mockUserName,
      alias: mockAlias,
      description: mockDescription,
      imageSrc: mockImageSrc,
      postNum: mockPostNum,
      followerNum: mockFollowerNum,
      followingNum: mockFollowingNum
    };

    const mockQueryUserProfile: QueryUserProfile = {
      getId: () => mockUserId,
      getUserName: () => mockUserName,
      getAlias: () => mockAlias,
      getDescription: () => mockDescription,
      getImageSrc: () => mockImageSrc,
      getPostNum: () => mockPostNum,
      getFollowerNum: () => mockFollowerNum,
      getFollowingNum: () => mockFollowingNum
    };

    const mockBuildQueryUserProfile: BuildQueryUserProfile = jest.fn(
      () => mockQueryUserProfile
    );

    const mockUserRepository = ({
      getUserProfile: jest.fn(() => mockUserProfile)
    } as unknown) as UserRepository;

    const getUserProfileByIdService = makeGetUserProfileByIdService({
      buildQueryUserProfile: mockBuildQueryUserProfile,
      userRepository: mockUserRepository
    });

    // when
    const result = getUserProfileByIdService(mockUserId);

    // expect
    expect(result).resolves.toStrictEqual(mockQueryUserProfile);
  });
});
