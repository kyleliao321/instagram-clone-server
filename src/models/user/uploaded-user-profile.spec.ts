import { IdHandler } from '../../utilities/types';
import makeBuildNewUserProfile from './uploaded-user-profile';

describe('new-user-profile-model', () => {
    test('should throw error when user id is not valid', () => {
        // given
        const mockId = 'mockId';
        const mockUserName = 'mockUserName';

        const mockIdHandler: IdHandler = {
            getId: jest.fn(() => mockId),
            isValid: jest.fn(() => false)
        };
        
        const buildNewUserProfile = makeBuildNewUserProfile({
            idHandler: mockIdHandler
        });

        // when & expect
        expect(() => {
            buildNewUserProfile({
                id: mockId,
                userName: mockUserName
            })
        }).toThrow('User Profile must have a valid id.');
    })

    test('should return correct result when user alias is not given', () => {
        // given
        const mockId = 'mockId';
        const mockUserName = 'mockUserName';

        const mockIdHandler: IdHandler = {
            getId: jest.fn(() => mockId),
            isValid: jest.fn(() => true)
        };
        
        const buildNewUserProfile = makeBuildNewUserProfile({
            idHandler: mockIdHandler
        });

        // when
        const result = buildNewUserProfile({
            id: mockId,
            userName: mockUserName
        });

        // expect
        expect(result.getUserName()).toBe(mockUserName);
        expect(result.getAlias()).toBe(mockUserName);
        expect(result.getDescription()).toBe(undefined);
        expect(result.getImageByteArray()).toBe(undefined);
    });

    test('should return correct result when user alias is given', () => {
        // given
        const mockId = 'mockId';
        const mockUserName = 'mockUserName';
        const mockAlias = 'mockAlias';

        const mockIdHandler: IdHandler = {
            getId: jest.fn(() => mockId),
            isValid: jest.fn(() => true)
        };

        const buildNewUserProfile = makeBuildNewUserProfile({
            idHandler: mockIdHandler
        });

        // when
        const result = buildNewUserProfile({
            id: mockId,
            userName: mockUserName,
            alias: mockAlias
        });

        // expect
        expect(result.getUserName()).toBe(mockUserName);
        expect(result.getAlias()).toBe(mockAlias);
        expect(result.getDescription()).toBe(undefined);
        expect(result.getImageByteArray()).toBe(undefined);
    })
})