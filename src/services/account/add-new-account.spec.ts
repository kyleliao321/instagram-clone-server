import {
  AccountRepository,
  AddNewAccountService,
  BuildNewAccount,
  NewAccount
} from '../../utilities/types';
import makeAddNewAccountService from './add-new-account';

describe('add-new-account-service', () => {
  test('should return correct result when invoke successfully', async () => {
    // given
    const mockId = 'mockId';
    const mockUserName = 'mockUserName';
    const mockPassword = 'mockPassword';

    const mockNewAccount: NewAccount = {
      getId: jest.fn(),
      getUserName: jest.fn(),
      getHashedPassword: jest.fn()
    };

    const buildNewAccount: BuildNewAccount = jest.fn(() => mockNewAccount);

    const accountRepository = ({
      insertNewAccount: jest.fn(() => Promise.resolve(mockId))
    } as unknown) as AccountRepository;

    const addNewAccountService: AddNewAccountService = makeAddNewAccountService(
      {
        buildNewAccount,
        accountRepository
      }
    );

    // when
    const result = addNewAccountService({
      userName: mockUserName,
      password: mockPassword
    });

    // expect
    expect(result).resolves.toBe(mockId);
  });
});
