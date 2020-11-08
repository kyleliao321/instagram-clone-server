import { HashHandler, IdHandler } from '../../utilities/types';
import makeBuildNewAccount from './new-account';

describe('new-account-model', () => {
  test('should throw error when IdHandler generate an invalid id', () => {
    // given
    const mockId = 'mockId';
    const mockUserName = 'mockUserName';
    const mockPassword = 'mockPassword';

    const mockIdHandler: IdHandler = {
      getId: jest.fn(() => mockId),
      isValid: jest.fn(() => false)
    };

    const mockHashHandler: HashHandler = {
      hash: jest.fn()
    };

    const buildNewAccount = makeBuildNewAccount({
      idHandler: mockIdHandler,
      hashHandler: mockHashHandler
    });

    // when & expect
    expect(() => {
      buildNewAccount({
        userName: mockUserName,
        password: mockPassword
      });
    }).toThrow('New Account must have a valid id.');
  });

  test('should return correct result when invoke successfully', () => {
    // given
    const mockId = 'mockId';
    const mockUserName = 'mockUserName';
    const mockPassword = 'mockPassword';
    const mockHashedPassword = 'hashedPassword';

    const mockIdHandler: IdHandler = {
      getId: jest.fn(() => mockId),
      isValid: jest.fn(() => true)
    };

    const mockHashHandler: HashHandler = {
      hash: jest.fn(() => mockHashedPassword)
    };

    const buildNewAccount = makeBuildNewAccount({
      idHandler: mockIdHandler,
      hashHandler: mockHashHandler
    });

    // when
    const result = buildNewAccount({
      userName: mockUserName,
      password: mockPassword
    });

    // expect
    expect(result.getId()).toBe(mockId);
    expect(result.getUserName()).toBe(mockUserName);
    expect(result.getHashedPassword()).toBe(mockHashedPassword);
  });
});
