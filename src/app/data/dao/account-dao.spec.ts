import db from '../../../db';
import { UnauthorizedError } from '../../utilities/http-error';
import { LoginAccount, NewAccount } from '../../utilities/types';
import makeBuildAccountDao from './account-dao';

describe('accounts-dao', () => {
  beforeAll(async () => {
    return await db.migrate.latest();
  });

  afterAll(async () => {
    return db.migrate.rollback().then(() => db.destroy());
  });

  afterEach(async () => {
    return db('accounts_table').del();
  });

  test('should get correct result after given data has been inserted into database', async () => {
    // given
    const userId = '1229d5f3-3e5a-4a21-a2ed-f3149833222c';
    const userName = 'user_name_1';
    const hashedPassword = 'user_hashed_passowrd_1';

    const newAccount: NewAccount = {
      getId: jest.fn(() => userId),
      getUserName: jest.fn(() => userName),
      getHashedPassword: jest.fn(() => hashedPassword)
    };

    const buildAccountDao = makeBuildAccountDao({ db });

    const accountDao = buildAccountDao();

    // when
    const result = await accountDao.insert(newAccount);

    // expect
    expect(result).toBe(userId);
  });

  test('should return correct result when given login account information exists in database', async () => {
    // given
    const userId = '1229d5f3-3e5a-4a21-a2ed-f3149833222c';
    const userName = 'user_name_1';
    const hashedPassword = 'user_hashed_passowrd_1';

    const newAccount: NewAccount = {
      getId: jest.fn(() => userId),
      getUserName: jest.fn(() => userName),
      getHashedPassword: jest.fn(() => hashedPassword)
    };

    const loginAccount: LoginAccount = {
      getUserName: jest.fn(() => userName),
      getHashedPassword: jest.fn(() => hashedPassword)
    };

    const buildAccountDao = makeBuildAccountDao({ db });

    const accountDao = buildAccountDao();

    // when
    await accountDao.insert(newAccount);

    const result = await accountDao.verify(loginAccount);

    // expect
    expect(result).toBe(userId);
  });

  test('should return correct result when given login account information doest not exist in database - scenario 1', async () => {
    // given
    const shouldNotBeCalled = jest.fn();

    const userId = '1229d5f3-3e5a-4a21-a2ed-f3149833222c';
    const userName = 'user_name_1';
    const hashedPassword = 'user_hashed_passowrd_1';
    const wrongUserName = 'user_name_2';

    const newAccount: NewAccount = {
      getId: jest.fn(() => userId),
      getUserName: jest.fn(() => userName),
      getHashedPassword: jest.fn(() => hashedPassword)
    };

    const loginAccount: LoginAccount = {
      getUserName: jest.fn(() => wrongUserName),
      getHashedPassword: jest.fn(() => hashedPassword)
    };

    const buildAccountDao = makeBuildAccountDao({ db });

    const accountDao = buildAccountDao();

    // when
    await accountDao.insert(newAccount);

    try {
      const result = await accountDao.verify(loginAccount);
      shouldNotBeCalled();
    } catch (e) {
      expect(e).toBeInstanceOf(UnauthorizedError);
    } finally {
      expect(shouldNotBeCalled).not.toBeCalled();
    }
  });

  test('should return correct result when given login account information doest not exist in database - scenario 2', async () => {
    // given
    const shouldNotBeCalled = jest.fn();

    const userId = '1229d5f3-3e5a-4a21-a2ed-f3149833222c';
    const userName = 'user_name_1';
    const hashedPassword = 'user_hashed_passowrd_1';
    const wrongPassword = 'user_hashed_passowrd_2';

    const newAccount: NewAccount = {
      getId: jest.fn(() => userId),
      getUserName: jest.fn(() => userName),
      getHashedPassword: jest.fn(() => hashedPassword)
    };

    const loginAccount: LoginAccount = {
      getUserName: jest.fn(() => userName),
      getHashedPassword: jest.fn(() => wrongPassword)
    };

    const buildAccountDao = makeBuildAccountDao({ db });

    const accountDao = buildAccountDao();

    // when
    await accountDao.insert(newAccount);

    try {
      const result = await accountDao.verify(loginAccount);
      shouldNotBeCalled();
    } catch (e) {
      expect(e).toBeInstanceOf(UnauthorizedError);
    } finally {
      expect(shouldNotBeCalled).not.toBeCalled();
    }
  });

  test('should return correct result when given login account information doest not exist in database - scenario 3', async () => {
    // given
    const shouldNotBeCalled = jest.fn();

    const userId = '1229d5f3-3e5a-4a21-a2ed-f3149833222c';
    const userName = 'user_name_1';
    const hashedPassword = 'user_hashed_passowrd_1';
    const wrongUserName = 'user_name_2';
    const wrongPassword = 'user_hashed_password_2';

    const newAccount: NewAccount = {
      getId: jest.fn(() => userId),
      getUserName: jest.fn(() => userName),
      getHashedPassword: jest.fn(() => hashedPassword)
    };

    const loginAccount: LoginAccount = {
      getUserName: jest.fn(() => wrongUserName),
      getHashedPassword: jest.fn(() => wrongPassword)
    };

    const buildAccountDao = makeBuildAccountDao({ db });

    const accountDao = buildAccountDao();

    // when
    await accountDao.insert(newAccount);

    try {
      const result = await accountDao.verify(loginAccount);
      shouldNotBeCalled();
    } catch (e) {
      expect(e).toBeInstanceOf(UnauthorizedError);
    } finally {
      expect(shouldNotBeCalled).not.toBeCalled();
    }
  });
});
