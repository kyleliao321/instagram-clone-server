import makeAddNewPost from './add-new-post';
import { UnauthorizedError } from '../../utilities/http-error';
import {
  AddNewPostRequestBody,
  AddNewPostService,
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

    const addNewPost = makeAddNewPost({
      verifyTokenService,
      addNewPostService
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

    const addNewPost = makeAddNewPost({
      verifyTokenService,
      addNewPostService
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
  });
});
