import { Request } from 'express';
import {
  AddNewAccountService,
  AddNewUserProfileService
} from '../../utilities/types';
import makeRegister from './register';

describe('register', () => {
  test('should return response with 201 status code when controller invoke successfully', async () => {
    // given
    const mockId = 'mockId';
    const mockUserName = 'mockUserName';
    const mockPassword = 'mockPassword';

    const mockRequest = {
      body: {
        userName: mockUserName,
        password: mockPassword
      }
    } as Request;

    const mockAddNewAccountService: AddNewAccountService = jest.fn(() =>
      Promise.resolve(mockId)
    );

    const mockAddUserProfileService: AddNewUserProfileService = jest.fn();

    const register = makeRegister({
      addNewAccountService: mockAddNewAccountService,
      addNewUserProfileService: mockAddUserProfileService
    });

    // when
    const result = register(mockRequest);

    // expect
    expect(result).resolves.toStrictEqual({
      headers: {
        'Content-Type': 'application/json'
      },
      status: 201
    });
  });
});
