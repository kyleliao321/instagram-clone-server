import { UnauthorizedError } from '../../utilities/http-error';
import makeAuthHandler from './auth-handler';

describe('auth-handler', () => {
  test('should return correct result when private key is the same', () => {
    // given
    const mockKey = 'mockKey';
    const mockPayload = {
      userId: 'mockId'
    };

    const authHandler = makeAuthHandler();

    // when
    const token = authHandler.sign(mockPayload, mockKey);

    const decoded = authHandler.verify(token, mockKey) as {
      userId: string;
    };

    // expect
    expect(decoded.userId).toBe(mockPayload.userId);
  });

  test('should throw an unauthorized error when private key is not the same', () => {
    // given
    const mockSignKey = 'mockSignKey';
    const mockVerifyKey = 'mockVerifyKey';
    const mockPayload = {
      userId: 'mockId'
    };

    const authHandler = makeAuthHandler();

    // when
    const token = authHandler.sign(mockPayload, mockSignKey);

    // expect
    expect(() => {
      authHandler.verify(token, mockVerifyKey);
    }).toThrowError(UnauthorizedError);
  });
});
