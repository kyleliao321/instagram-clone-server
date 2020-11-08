import {
  BuildNewUserProfile,
  NewUserProfile,
  UserRepository
} from '../../utilities/types';
import makeAddNewUserProfile from './add-new-user-profile';

describe('add-new-user-profile', () => {
  test('should return correct result when invoke successfully', async () => {
    // given
    const mockId = 'mockId';
    const mockUserName = 'mockUserName';

    const mockNewUserProfile: NewUserProfile = {
      getId: jest.fn(),
      getUserName: jest.fn(),
      getAlias: jest.fn(),
      getDescription: jest.fn(),
      getImageByteArray: jest.fn()
    };

    const mockBuildNewUserProfile: BuildNewUserProfile = jest.fn(
      () => mockNewUserProfile
    );

    const mockUserRepository: UserRepository = {
      insertNewUserProfile: jest.fn(() => Promise.resolve(mockId))
    };

    const addNewUserProfile = makeAddNewUserProfile({
      buildNewUserProfile: mockBuildNewUserProfile,
      userRepository: mockUserRepository
    });

    // when
    const result = addNewUserProfile({
      id: mockId,
      userName: mockUserName
    });

    // expect
    expect(result).resolves.toBe(mockId);
  });
});
