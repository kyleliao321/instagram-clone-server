import { Request } from 'express';
import { AuthenticationError } from '../utilities/http-errors';
import { GenerateTokenService, VerifyAccountService } from '../utilities/types';
import makeLogin from './login';

describe('login', () => {
  test('should return response with 500 status code when generateToken throw an non-http-error', async () => {
    // given
    const mockUserName = 'mockUserName';
    const mockPassword = 'mockPassword';

    const mockRequest = {
      body: {
        userName: mockUserName,
        password: mockPassword
      }
    } as Request;

    const mockGenerateToken: GenerateTokenService = jest.fn(() => {
      throw new Error('Unknown error from GenerateToken');
    });

    const mockVerifyAccount: VerifyAccountService = jest.fn();

    const login = makeLogin({
      generateToken: mockGenerateToken,
      verifyAccount: mockVerifyAccount
    });

    // when
    const result = login(mockRequest);

    // expect
    expect(result).resolves.toStrictEqual({
      headers: {
        'Content-Type': 'application/json'
      },
      status: 500
    });
  });

  test('should return response with 500 status code when verifyAccount throw an non-http-error', async () => {
    // given
    const mockUserName = 'mockUserName';
    const mockPassword = 'mockPassword';
    const mockToken = 'mockToken';

    const mockRequest = {
      body: {
        userName: mockUserName,
        password: mockPassword
      }
    } as Request;

    const mockGenerateToken: GenerateTokenService = jest.fn(() => mockToken);

    const mockVerifyAccount: VerifyAccountService = jest.fn(() => {
      throw new Error('Unknown error from VerifyAccount');
    });

    const login = makeLogin({
      generateToken: mockGenerateToken,
      verifyAccount: mockVerifyAccount
    });

    // when
    const result = login(mockRequest);

    // expect
    expect(result).resolves.toStrictEqual({
      headers: {
        'Content-Type': 'application/json'
      },
      status: 500
    });
  });

  test('should return response with given status code when verifyAccount throw a HttpError', async () => {
    // given
    const mockUserName = 'mockUserName';
    const mockPassword = 'mockPassword';
    const mockToken = 'mockToken';

    const mockRequest = {
      body: {
        userName: mockUserName,
        password: mockPassword
      }
    } as Request;

    const mockGenerateToken: GenerateTokenService = jest.fn(() => mockToken);

    const mockVerifyAccount: VerifyAccountService = jest.fn(() => {
      throw new AuthenticationError();
    });

    const login = makeLogin({
      generateToken: mockGenerateToken,
      verifyAccount: mockVerifyAccount
    });

    // when
    const result = login(mockRequest);

    // expect
    expect(result).resolves.toStrictEqual({
      headers: {
        'Content-Type': 'application/json'
      },
      status: AuthenticationError.STATUS_CODE
    });
  });
});
