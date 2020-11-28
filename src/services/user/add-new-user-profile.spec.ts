import {
  BuildNewUserProfile,
  NewUserProfile,
  UserRepository
} from '../../utilities/types';
import makeAddNewUserProfileService from './add-new-user-profile';

describe('add-new-user-profile-service', () => {
  test('should return correct result when invoke successfully', async () => {
    // given
    const mockId = 'mockId';
    const mockUserName = 'mockUserName';

    const mockNewUserProfile: NewUserProfile = {
      getId: jest.fn(),
      getUserName: jest.fn(),
      getAlias: jest.fn(),
      getDescription: jest.fn(),
      getEncodedImage: jest.fn()
    };

    const mockBuildNewUserProfile: BuildNewUserProfile = jest.fn(
      () => mockNewUserProfile
    );

    const mockUserRepository = ({
      insertNewUserProfile: jest.fn(() => Promise.resolve(mockId))
    } as unknown) as UserRepository;

    const addNewUserProfileService = makeAddNewUserProfileService({
      buildNewUserProfile: mockBuildNewUserProfile,
      userRepository: mockUserRepository
    });

    // when
    const result = addNewUserProfileService({
      id: mockId,
      userName: mockUserName
    });

    // expect
    expect(result).resolves.toBe(mockId);
  });
});
