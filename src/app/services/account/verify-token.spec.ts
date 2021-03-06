import makeVerifyTokenService from './verify-token';
import { AuthHandler, VerifyTokenService } from '../../utilities/types';
import { UnauthorizedError } from '../../utilities/http-error';
import { BadRequestError } from '../../utilities/http-error/http-errors';

describe('verify-token-service', () => {
  test('should throw an error when given bearer headers is undefined.', () => {
    // given
    const mockBearerHeader = undefined;

    const mockAuthHandler = ({
      verify: jest.fn()
    } as unknown) as AuthHandler;

    const mockKey = 'mockKey';

    const verifyTokenService: VerifyTokenService = makeVerifyTokenService({
      authHandler: mockAuthHandler,
      key: mockKey
    });

    // when
    expect(() => {
      verifyTokenService(mockBearerHeader);
    }).toThrowError(UnauthorizedError);
  });

  test('should throw an error when given bearer header is not started with `bearer`', () => {
    // given
    const mockBearerHeader = 'other mockToken';

    const mockAuthHandler = ({
      verify: jest.fn()
    } as unknown) as AuthHandler;

    const mockKey = 'mockKey';

    const verifyTokenService: VerifyTokenService = makeVerifyTokenService({
      authHandler: mockAuthHandler,
      key: mockKey
    });

    // when
    expect(() => {
      verifyTokenService(mockBearerHeader);
    }).toThrowError(UnauthorizedError);
  });

  test('should throw an error when given bearer header is not separated as bearer and token', () => {
    // given
    const mockBearerHeader = 'bearermockToken';

    const mockAuthHandler = ({
      verify: jest.fn()
    } as unknown) as AuthHandler;

    const mockKey = 'mockKey';

    const verifyTokenService: VerifyTokenService = makeVerifyTokenService({
      authHandler: mockAuthHandler,
      key: mockKey
    });

    // when
    expect(() => {
      verifyTokenService(mockBearerHeader);
    }).toThrowError(UnauthorizedError);
  });

  test('should throw an error when given bearer header is not ended with a token', () => {
    // given
    const mockBearerHeader = 'Bearer';

    const mockAuthHandler = ({
      verify: jest.fn()
    } as unknown) as AuthHandler;

    const mockKey = 'mockKey';

    const verifyTokenService: VerifyTokenService = makeVerifyTokenService({
      authHandler: mockAuthHandler,
      key: mockKey
    });

    // when
    expect(() => {
      verifyTokenService(mockBearerHeader);
    }).toThrowError(UnauthorizedError);
  });

  test('should return userId when verifyTokenService invoke successfully', () => {
    // given
    const mockBearerHeader = 'Bearer mockToken';

    const mockId = 'mockId';

    const mockAuthHandler = ({
      verify: jest.fn(() => {
        return { userId: mockId };
      })
    } as unknown) as AuthHandler;

    const mockKey = 'mockKey';

    const verifyTokenService: VerifyTokenService = makeVerifyTokenService({
      authHandler: mockAuthHandler,
      key: mockKey
    });

    // when
    const result = verifyTokenService(mockBearerHeader);

    // expect
    expect(result).toBe(mockId);
  });
});
