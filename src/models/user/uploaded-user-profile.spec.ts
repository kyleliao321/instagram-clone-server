import makeBuildNewUserProfile from './uploaded-user-profile';

describe('new-user-profile-model', () => {
    test('should return correct result when user alias is not given', () => {
        // given
        const mockUserName = 'mockUserName';
        
        const buildNewUserProfile = makeBuildNewUserProfile();

        // when
        const result = buildNewUserProfile({
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
        const mockUserName = 'mockUserName';
        const mockAlias = 'mockAlias';

        const buildNewUserProfile = makeBuildNewUserProfile();

        // when
        const result = buildNewUserProfile({
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