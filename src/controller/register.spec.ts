import { Request } from 'express';
import { AddNewAccount, AddNewUserProfile } from '../utilities/types';
import makeRegister from './register';

describe('register', () => {
    test('should return response with 500 status code when addNewAccount throw an error', async () => {
        // given
        const mockUserName = 'mockUserName';
        const mockPassword = 'mockPassword';

        const mockRequest = {
            body: {
                userName: mockUserName,
                password: mockPassword
            }
        } as Request;

        const mockAddNewAccount: AddNewAccount = jest.fn(() => {
            throw new Error();
        });

        const mockAddUserProfile: AddNewUserProfile = jest.fn();

        const register = makeRegister({
            addNewAccount: mockAddNewAccount,
            addNewUserProfile: mockAddUserProfile
        });

        // when
        const result = register(mockRequest);
        
        // expect
        expect(result).resolves.toStrictEqual({
            headers: {
                'Content-Type': 'application/json'
            },
            status: 500
        });
    });

    test('should return response with 500 status code when addNewUserProfile throw an error', async () => {
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

        const mockAddNewAccount: AddNewAccount = jest.fn(() => Promise.resolve(mockId));

        const mockAddUserProfile: AddNewUserProfile = jest.fn(() => {
            throw new Error();
        });

        const register = makeRegister({
            addNewAccount: mockAddNewAccount,
            addNewUserProfile: mockAddUserProfile
        });

        // when
        const result = register(mockRequest);
        
        // expect
        expect(result).resolves.toStrictEqual({
            headers: {
                'Content-Type': 'application/json'
            },
            status: 500
        });
    });

    test('should return response with 200 status code when controller invoke successfully', async () => {
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

        const mockAddNewAccount: AddNewAccount = jest.fn(() => Promise.resolve(mockId));

        const mockAddUserProfile: AddNewUserProfile = jest.fn();

        const register = makeRegister({
            addNewAccount: mockAddNewAccount,
            addNewUserProfile: mockAddUserProfile
        });

        // when
        const result = register(mockRequest);
        
        // expect
        expect(result).resolves.toStrictEqual({
            headers: {
                'Content-Type': 'application/json'
            },
            status: 200
        });
    })
})