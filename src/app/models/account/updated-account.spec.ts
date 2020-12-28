import { HashHandler } from '../../utilities/types';
import makeBuildUpdatedAccount from './updated-account';

describe('update-account-test', () => {
  test('getHashedPassword should return undefined if provided password info is also undefined', () => {
    // given
    const id = 'mockId';
    const userName = 'mockUserName';
    const password = undefined;

    const info = {
      id,
      userName,
      password
    };

    const hashHandler: HashHandler = {
      hash: jest.fn()
    };

    const buildUpdatedAccount = makeBuildUpdatedAccount({ hashHandler });

    // when
    const updatedAccount = buildUpdatedAccount(info);

    // expect
    expect(updatedAccount.getUserName()).toBe(userName);
    expect(updatedAccount.getHashedPassword()).toBe(undefined);
  });

  test('getHashedPassword should return hashed password if provided password is not undefined', () => {
    // given
    const id = 'mockId';
    const userName = 'mockUserName';
    const password = 'mockPassowrd';
    const hashedPassword = 'mockHashedPassword';

    const info = {
      id,
      userName,
      password
    };

    const hashHandler: HashHandler = {
      hash: jest.fn(() => hashedPassword)
    };

    const buildUpdatedAccount = makeBuildUpdatedAccount({ hashHandler });

    // when
    const updatedAccount = buildUpdatedAccount(info);

    // expect
    expect(updatedAccount.getUserName()).toBe(userName);
    expect(updatedAccount.getHashedPassword()).toBe(hashedPassword);
  });
});
