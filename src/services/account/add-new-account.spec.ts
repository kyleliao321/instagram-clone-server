import {
  AccountRepository,
  AddNewAccount,
  BuildNewAccount,
  NewAccount
} from '../../utilities/types';
import makeAddNewAccount from './add-new-account';

describe('add-new-account', () => {
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

    const accountRepository: AccountRepository = {
      insertNewAccount: jest.fn(() => Promise.resolve(mockId))
    };

    const addNewAccount: AddNewAccount = makeAddNewAccount({
      buildNewAccount,
      accountRepository
    });

    // when
    const result = addNewAccount({
      userName: mockUserName,
      password: mockPassword
    });

    // expect
    expect(result).resolves.toBe(mockId);
  });
});
