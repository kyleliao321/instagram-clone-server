import { IdHandler, ImageHandler } from '../../utilities/types';
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

    const mockImageHandler: ImageHandler = {
      exports: jest.fn(() => Promise.resolve('mock-file.jpeg')),
      isValid: jest.fn()
    };

    const buildNewUserProfile = makeBuildNewUserProfile({
      idHandler: mockIdHandler,
      imageHandler: mockImageHandler
    });

    // when & expect
    expect(() => {
      buildNewUserProfile({
        id: mockId,
        userName: mockUserName
      });
    }).toThrow('User Profile must have a valid id.');
  });

  test('should return correct result when user alias is not given', () => {
    // given
    const mockId = 'mockId';
    const mockUserName = 'mockUserName';

    const mockIdHandler: IdHandler = {
      getId: jest.fn(() => mockId),
      isValid: jest.fn(() => true)
    };

    const mockImageHandler: ImageHandler = {
      exports: jest.fn(() => Promise.resolve('mock-file.jpeg')),
      isValid: jest.fn()
    };

    const buildNewUserProfile = makeBuildNewUserProfile({
      idHandler: mockIdHandler,
      imageHandler: mockImageHandler
    });

    // when
    const result = buildNewUserProfile({
      id: mockId,
      userName: mockUserName
    });

    // expect
    expect(result.getUserName()).toBe(mockUserName);
    expect(result.getAlias()).toBe(mockUserName);
    expect(result.getDescription()).toBe(null);
    expect(result.getEncodedImage()).toBe(null);
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

    const mockImageHandler: ImageHandler = {
      exports: jest.fn(() => Promise.resolve('mock-file.jpeg')),
      isValid: jest.fn()
    };

    const buildNewUserProfile = makeBuildNewUserProfile({
      idHandler: mockIdHandler,
      imageHandler: mockImageHandler
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
    expect(result.getDescription()).toBe(null);
    expect(result.getEncodedImage()).toBe(null);
  });

  test('getImageSrc should get file name when encoded image is valid', async () => {
    // given
    const mockId = 'mockId';
    const mockUserName = 'mockUserName';
    const mockAlias = 'mockAlias';
    const mockEncodedImage = 'mockEncodedImage';
    const mockFileName = 'mockFileName';

    const mockIdHandler: IdHandler = {
      getId: jest.fn(() => mockId),
      isValid: jest.fn(() => true)
    };

    const mockImageHandler: ImageHandler = {
      exports: jest.fn(() => Promise.resolve('mockFileName')),
      isValid: jest.fn()
    };

    const buildNewUserProfile = makeBuildNewUserProfile({
      idHandler: mockIdHandler,
      imageHandler: mockImageHandler
    });

    // when
    const userProfile = buildNewUserProfile({
      id: mockId,
      userName: mockUserName,
      alias: mockAlias,
      encodedImage: mockEncodedImage
    });

    const fileName = await userProfile.getImageSrc();

    // expect
    expect(fileName).toBe(mockFileName);
  });

  test('getImageSrc should get null when encoded image is not provided', async () => {
    // given
    const mockId = 'mockId';
    const mockUserName = 'mockUserName';
    const mockAlias = 'mockAlias';

    const mockIdHandler: IdHandler = {
      getId: jest.fn(() => mockId),
      isValid: jest.fn(() => true)
    };

    const mockImageHandler: ImageHandler = {
      exports: jest.fn(),
      isValid: jest.fn()
    };

    const buildNewUserProfile = makeBuildNewUserProfile({
      idHandler: mockIdHandler,
      imageHandler: mockImageHandler
    });

    // when
    const userProfile = buildNewUserProfile({
      id: mockId,
      userName: mockUserName,
      alias: mockAlias
    });

    const fileName = await userProfile.getImageSrc();

    // expect
    expect(fileName).toBe(null);
  });

  test('getImageSrc should get null when imaegHandler.exports throws an error', async () => {
    // given
    const mockId = 'mockId';
    const mockUserName = 'mockUserName';
    const mockAlias = 'mockAlias';
    const mockEncodedImage = 'mockEncodedImage';

    const mockIdHandler: IdHandler = {
      getId: jest.fn(() => mockId),
      isValid: jest.fn(() => true)
    };

    const mockImageHandler: ImageHandler = {
      exports: jest.fn(() => {
        throw new Error();
      }),
      isValid: jest.fn()
    };

    const buildNewUserProfile = makeBuildNewUserProfile({
      idHandler: mockIdHandler,
      imageHandler: mockImageHandler
    });

    // when
    const userProfile = buildNewUserProfile({
      id: mockId,
      userName: mockUserName,
      alias: mockAlias,
      encodedImage: mockEncodedImage
    });

    const fileName = await userProfile.getImageSrc();

    // expect
    expect(fileName).toBe(null);
  });
});
