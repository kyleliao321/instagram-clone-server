import {
  AccountDao,
  LoginAccount,
  NewAccount,
  UpdatedAccount
} from '../../utilities/types';
import makeBuildAccountRepository from './account-repository';

describe('account-repository', () => {
  test('should trigger accountDao.insert while invoke insertNewAccount', async () => {
    // given
    const mockNewAccount: NewAccount = {
      getId: jest.fn(),
      getUserName: jest.fn(),
      getHashedPassword: jest.fn()
    };

    const mockAccountDao: AccountDao = {
      insert: jest.fn(),
      update: jest.fn(),
      verify: jest.fn()
    };

    const buildAccountRepository = makeBuildAccountRepository({
      accountDao: mockAccountDao
    });

    const accountRepository = buildAccountRepository();

    // when
    await accountRepository.insertNewAccount(mockNewAccount);

    // expect
    expect(mockAccountDao.insert).toHaveBeenCalledTimes(1);
  });

  test('should trigger accountDao.verify while invoke verifyLoginAccount', async () => {
    // given
    const mockLoginAccount: LoginAccount = {
      getUserName: jest.fn(),
      getHashedPassword: jest.fn()
    };

    const mockAccountDao: AccountDao = {
      insert: jest.fn(),
      update: jest.fn(),
      verify: jest.fn()
    };

    const buildAccountRepository = makeBuildAccountRepository({
      accountDao: mockAccountDao
    });

    const accountRepository = buildAccountRepository();

    // when
    await accountRepository.verifyLoginAccount(mockLoginAccount);

    // expect
    expect(mockAccountDao.verify).toHaveBeenCalledTimes(1);
  });

  test('should trigger accountDao.update while invoke updateAccount', async () => {
    // given
    const mockUpdatedAccount: UpdatedAccount = {
      getId: jest.fn(),
      getUserName: jest.fn(),
      getHashedPassword: jest.fn()
    };

    const mockAccountDao: AccountDao = {
      insert: jest.fn(),
      update: jest.fn(),
      verify: jest.fn()
    };

    const buildAccountRepository = makeBuildAccountRepository({
      accountDao: mockAccountDao
    });

    const accountRepository = buildAccountRepository();

    // when
    await accountRepository.updateAccount(mockUpdatedAccount);

    // expect
    expect(mockAccountDao.update).toHaveBeenCalledTimes(1);
  });
});
