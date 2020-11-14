import {
  AccountRepository,
  BuildLoginAccount,
  LoginAccount
} from '../../utilities/types';
import buildVerifyAccount from './verify-account';

describe('verify-account', () => {
  test('should return correct result when invoke successfully', async () => {
    // given
    const mockId = 'mockId';
    const mockUserName = 'mockUserName';
    const mockPassword = 'mockPassword';
    const mockHashedPassword = 'mockHashedPassword';

    const mockLoginAccount: LoginAccount = {
      getUserName: () => mockUserName,
      getHashedPassword: () => mockHashedPassword
    };

    const buildLoginAccount: BuildLoginAccount = jest.fn(
      () => mockLoginAccount
    );

    const accountRepository: AccountRepository = {
      insertNewAccount: jest.fn(),
      verifyLoginAccount: jest.fn(() => Promise.resolve(mockId))
    };

    const verifyAccount = buildVerifyAccount({
      buildLoginAccount,
      accountRepository
    });

    // when
    const result = verifyAccount({
      userName: mockUserName,
      password: mockPassword
    });

    // expect
    expect(result).resolves.toBe(mockId);
  });
});
