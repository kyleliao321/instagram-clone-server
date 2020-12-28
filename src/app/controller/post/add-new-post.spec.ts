import makeAddNewPost from './add-new-post';
import { UnauthorizedError } from '../../utilities/http-error';
import {
  AddNewPostRequestBody,
  AddNewPostService,
  GetUserProfileService,
  UpdateUserProfileService,
  VerifyTokenService
} from '../../utilities/types';
import { Request } from 'express';

describe('add-new-post-controller', () => {
  test('should throw an UnauthorizedError when tokenUserId is not compataible with postedUserId', async () => {
    // given
    const shouldNotBeCalled = jest.fn();

    const mockId = 'mockId';
    const mockDes = 'mockDes';
    const mockLoc = 'mockLoc';
    const mockTis = 'mockTis';
    const mockEncodedImg = 'mockEncodedImg';
    const mokcPostedUserId = 'mokcPostedUserId';

    const mockReq = ({
      headers: {
        authorization: 'mockAuth'
      },
      body: {
        description: mockDes,
        location: mockLoc,
        timestamp: mockTis,
        encodedImage: mockEncodedImg,
        postedUserId: mokcPostedUserId
      } as AddNewPostRequestBody
    } as unknown) as Request;

    const verifyTokenService: VerifyTokenService = jest.fn(() => 'tokenId');

    const addNewPostService: AddNewPostService = jest.fn();

    const getUserProfileByIdService: GetUserProfileService = jest.fn();

    const updateUserProfileService: UpdateUserProfileService = jest.fn();

    const addNewPost = makeAddNewPost({
      verifyTokenService,
      addNewPostService,
      getUserProfileByIdService,
      updateUserProfileService
    });

    // given
    try {
      await addNewPost(mockReq);
      shouldNotBeCalled();
    } catch (e) {
      expect(e).toBeInstanceOf(UnauthorizedError);
    } finally {
      expect(shouldNotBeCalled).not.toBeCalled();
    }
  });

  test('should return correct result when invoke successfully', async () => {
    // given
    const mockId = 'mockId';
    const mockDes = 'mockDes';
    const mockLoc = 'mockLoc';
    const mockTis = 'mockTis';
    const mockEncodedImg = 'mockEncodedImg';
    const mockImgSrc = 'mockImgSrc';
    const mokcPostedUserId = 'mokcPostedUserId';

    const mockUserName = 'mockUserName';
    const mockAlias = 'mockAlias';
    const mockDescription = 'mockDescription';
    const mockImageSrc = 'mockImageSrc';
    const mockPostNum = 0;
    const mockFollowerNum = 0;
    const mockFollowingNum = 0;

    const mockReq = ({
      headers: {
        authorization: 'mockAuth'
      },
      body: {
        description: mockDes,
        location: mockLoc,
        timestamp: mockTis,
        encodedImage: mockEncodedImg,
        postedUserId: mokcPostedUserId
      } as AddNewPostRequestBody
    } as unknown) as Request;

    const verifyTokenService: VerifyTokenService = jest.fn(
      () => mokcPostedUserId
    );

    const addNewPostService: AddNewPostService = jest.fn(() =>
      Promise.resolve({
        getId: jest.fn(() => mockId),
        getDescription: jest.fn(() => mockDes),
        getLocation: jest.fn(() => mockLoc),
        getTimeStamp: jest.fn(() => mockTis),
        getImageSrc: jest.fn(() => mockImgSrc),
        getPostedUserId: jest.fn(() => mokcPostedUserId)
      })
    );

    const getUserProfileByIdService: GetUserProfileService = jest.fn(() =>
      Promise.resolve({
        getId: jest.fn(() => mokcPostedUserId),
        getUserName: jest.fn(() => mockUserName),
        getAlias: jest.fn(() => mockAlias),
        getDescription: jest.fn(() => mockDescription),
        getImageSrc: jest.fn(() => mockImageSrc),
        getPostNum: jest.fn(() => mockPostNum),
        getFollowerNum: jest.fn(() => mockFollowerNum),
        getFollowingNum: jest.fn(() => mockFollowingNum)
      })
    );

    const updateUserProfileService: UpdateUserProfileService = jest.fn();

    const addNewPost = makeAddNewPost({
      verifyTokenService,
      addNewPostService,
      getUserProfileByIdService,
      updateUserProfileService
    });

    // given
    const result = await addNewPost(mockReq);

    // expect
    expect(result.headers).toStrictEqual({
      'Content-Type': 'application/json'
    });
    expect(result.status).toBe(201);
    expect(result.body).toStrictEqual({
      id: mockId,
      description: mockDes,
      location: mockLoc,
      timestamp: mockTis,
      imageSrc: mockImgSrc,
      postedUserId: mokcPostedUserId
    });

    expect(getUserProfileByIdService).toBeCalledTimes(1);
    expect(updateUserProfileService).toBeCalledTimes(1);
  });

  test('should accept unknow as description info', async () => {
    // given
    const mockId = 'mockId';
    const mockLoc = 'mockLoc';
    const mockTis = 'mockTis';
    const mockEncodedImg = 'mockEncodedImg';
    const mockImgSrc = 'mockImgSrc';
    const mokcPostedUserId = 'mokcPostedUserId';

    const mockUserName = 'mockUserName';
    const mockAlias = 'mockAlias';
    const mockDescription = 'mockDescription';
    const mockImageSrc = 'mockImageSrc';
    const mockPostNum = 0;
    const mockFollowerNum = 0;
    const mockFollowingNum = 0;

    const mockReq = ({
      headers: {
        authorization: 'mockAuth'
      },
      body: {
        location: mockLoc,
        timestamp: mockTis,
        encodedImage: mockEncodedImg,
        postedUserId: mokcPostedUserId
      } as AddNewPostRequestBody
    } as unknown) as Request;

    const verifyTokenService: VerifyTokenService = jest.fn(
      () => mokcPostedUserId
    );

    const addNewPostService: AddNewPostService = jest.fn(() =>
      Promise.resolve({
        getId: jest.fn(() => mockId),
        getDescription: jest.fn(() => null),
        getLocation: jest.fn(() => mockLoc),
        getTimeStamp: jest.fn(() => mockTis),
        getImageSrc: jest.fn(() => mockImgSrc),
        getPostedUserId: jest.fn(() => mokcPostedUserId)
      })
    );

    const getUserProfileByIdService: GetUserProfileService = jest.fn(() =>
      Promise.resolve({
        getId: jest.fn(() => mokcPostedUserId),
        getUserName: jest.fn(() => mockUserName),
        getAlias: jest.fn(() => mockAlias),
        getDescription: jest.fn(() => mockDescription),
        getImageSrc: jest.fn(() => mockImageSrc),
        getPostNum: jest.fn(() => mockPostNum),
        getFollowerNum: jest.fn(() => mockFollowerNum),
        getFollowingNum: jest.fn(() => mockFollowingNum)
      })
    );

    const updateUserProfileService: UpdateUserProfileService = jest.fn();

    const addNewPost = makeAddNewPost({
      verifyTokenService,
      addNewPostService,
      getUserProfileByIdService,
      updateUserProfileService
    });

    // given
    const result = await addNewPost(mockReq);

    // expect
    expect(result.headers).toStrictEqual({
      'Content-Type': 'application/json'
    });
    expect(result.status).toBe(201);
    expect(result.body).toStrictEqual({
      id: mockId,
      description: null,
      location: mockLoc,
      timestamp: mockTis,
      imageSrc: mockImgSrc,
      postedUserId: mokcPostedUserId
    });

    expect(getUserProfileByIdService).toBeCalledTimes(1);
    expect(updateUserProfileService).toBeCalledTimes(1);
  });

  test('should accept unknow as location info', async () => {
    // given
    const mockId = 'mockId';
    const mockDes = 'mockDes';
    const mockTis = 'mockTis';
    const mockEncodedImg = 'mockEncodedImg';
    const mockImgSrc = 'mockImgSrc';
    const mokcPostedUserId = 'mokcPostedUserId';

    const mockUserName = 'mockUserName';
    const mockAlias = 'mockAlias';
    const mockDescription = 'mockDescription';
    const mockImageSrc = 'mockImageSrc';
    const mockPostNum = 0;
    const mockFollowerNum = 0;
    const mockFollowingNum = 0;

    const mockReq = ({
      headers: {
        authorization: 'mockAuth'
      },
      body: {
        description: mockDes,
        timestamp: mockTis,
        encodedImage: mockEncodedImg,
        postedUserId: mokcPostedUserId
      } as AddNewPostRequestBody
    } as unknown) as Request;

    const verifyTokenService: VerifyTokenService = jest.fn(
      () => mokcPostedUserId
    );

    const addNewPostService: AddNewPostService = jest.fn(() =>
      Promise.resolve({
        getId: jest.fn(() => mockId),
        getDescription: jest.fn(() => mockDes),
        getLocation: jest.fn(() => null),
        getTimeStamp: jest.fn(() => mockTis),
        getImageSrc: jest.fn(() => mockImgSrc),
        getPostedUserId: jest.fn(() => mokcPostedUserId)
      })
    );

    const getUserProfileByIdService: GetUserProfileService = jest.fn(() =>
      Promise.resolve({
        getId: jest.fn(() => mokcPostedUserId),
        getUserName: jest.fn(() => mockUserName),
        getAlias: jest.fn(() => mockAlias),
        getDescription: jest.fn(() => mockDescription),
        getImageSrc: jest.fn(() => mockImageSrc),
        getPostNum: jest.fn(() => mockPostNum),
        getFollowerNum: jest.fn(() => mockFollowerNum),
        getFollowingNum: jest.fn(() => mockFollowingNum)
      })
    );

    const updateUserProfileService: UpdateUserProfileService = jest.fn();

    const addNewPost = makeAddNewPost({
      verifyTokenService,
      addNewPostService,
      getUserProfileByIdService,
      updateUserProfileService
    });

    // given
    const result = await addNewPost(mockReq);

    // expect
    expect(result.headers).toStrictEqual({
      'Content-Type': 'application/json'
    });
    expect(result.status).toBe(201);
    expect(result.body).toStrictEqual({
      id: mockId,
      description: mockDes,
      location: null,
      timestamp: mockTis,
      imageSrc: mockImgSrc,
      postedUserId: mokcPostedUserId
    });

    expect(getUserProfileByIdService).toBeCalledTimes(1);
    expect(updateUserProfileService).toBeCalledTimes(1);
  });
});
