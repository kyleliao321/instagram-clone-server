import {
  AccountRepository,
  BuildLoginAccount,
  LoginAccount
} from '../../utilities/types';
import buildVerifyAccountService from './verify-account';

describe('verify-account-service', () => {
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

    const accountRepository = ({
      verifyLoginAccount: jest.fn(() => Promise.resolve(mockId))
    } as unknown) as AccountRepository;

    const verifyAccountService = buildVerifyAccountService({
      buildLoginAccount,
      accountRepository
    });

    // when
    const result = verifyAccountService({
      userName: mockUserName,
      password: mockPassword
    });

    // expect
    expect(result).resolves.toBe(mockId);
  });
});
