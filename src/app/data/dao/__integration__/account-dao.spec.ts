import {
  ConflictError,
  UnauthorizedError
} from '../../../utilities/http-error';
import {
  LoginAccount,
  NewAccount,
  UpdatedAccount
} from '../../../utilities/types';
import makeBuildAccountDao from '../account-dao';
import db from '../../../../db';

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

  test('should throw a conflict error when given username is already existed in database', async () => {
    // given
    const shouldNotBeCalled = jest.fn();

    const userId = '1229d5f3-3e5a-4a21-a2ed-f3149833222c';
    const otherUserId = '2d5e2879-8a9a-4a40-a671-ff6cd069509d';
    const userName = 'user_name_1';
    const hashedPassword = 'user_hashed_passowrd_1';

    const newAccount: NewAccount = {
      getId: jest.fn(() => userId),
      getUserName: jest.fn(() => userName),
      getHashedPassword: jest.fn(() => hashedPassword)
    };

    const otherNewAccount: NewAccount = {
      getId: jest.fn(() => otherUserId),
      getUserName: jest.fn(() => userName),
      getHashedPassword: jest.fn(() => hashedPassword)
    };

    const buildAccountDao = makeBuildAccountDao({ db });

    const accountDao = buildAccountDao();

    // when
    await accountDao.insert(newAccount);

    try {
      await accountDao.insert(otherNewAccount);
      shouldNotBeCalled();
    } catch (e) {
      expect(e).toBeInstanceOf(ConflictError);
    } finally {
      expect(shouldNotBeCalled).not.toBeCalled();
    }
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

  test('should return correct result when given updatedAccount is valid', async () => {
    // given
    const userId = '1229d5f3-3e5a-4a21-a2ed-f3149833222c';
    const userName = 'user_name_1';
    const hashedPassword = 'user_hashed_passowrd_1';
    const updatedUserName = 'user_name_2';
    const updatedPassword = 'user_hashed_password_2';

    const newAccount: NewAccount = {
      getId: jest.fn(() => userId),
      getUserName: jest.fn(() => userName),
      getHashedPassword: jest.fn(() => hashedPassword)
    };

    const updatedAccount: UpdatedAccount = {
      getId: jest.fn(() => userId),
      getUserName: jest.fn(() => updatedUserName),
      getHashedPassword: jest.fn(() => updatedPassword)
    };

    const buildAccountDao = makeBuildAccountDao({ db });

    const accountDao = buildAccountDao();

    // when
    await accountDao.insert(newAccount);
    const result = await accountDao.update(updatedAccount);

    // expect
    expect(result).toBe(userId);
  });
});
