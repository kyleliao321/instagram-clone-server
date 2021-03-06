import { Request } from 'express';
import { BadRequestError, ForbiddenError } from '../../utilities/http-error';
import {
  UpdateAccountService,
  UpdateUserProfileRequestBody,
  UpdateUserProfileService,
  VerifyTokenService
} from '../../utilities/types';
import makeUpdateUserProfile from './update-user-profile';

describe('update user profile controller', () => {
  test('should throw BadRequestError when given id params are not compatible between path-param and body-param', async () => {
    // given
    const shouldNotToBeCalled = jest.fn();

    const mockId = 'mockId';
    const mockUserName = 'mockUserName';
    const mockAlias = 'mockAlias';
    const mockDescription = 'mockDes';
    const mockPostNum = 0;
    const mockFollowerNum = 0;
    const mockFollowingNum = 0;

    const mockRequest = ({
      headers: {
        authorization: 'mockAuth'
      },
      params: {
        userId: 'mockId2'
      },
      body: {
        id: mockId,
        userName: mockUserName,
        alias: mockAlias,
        description: mockDescription,
        postNum: mockPostNum,
        followerNum: mockFollowerNum,
        followingNum: mockFollowingNum
      } as UpdateUserProfileRequestBody
    } as unknown) as Request;

    const mockUpdateUserProfileService: UpdateUserProfileService = jest.fn();

    const mockVerifyTokenService: VerifyTokenService = jest.fn(() => mockId);

    const mockUpdateAccountService: UpdateAccountService = jest.fn();

    const updateUserProfile = makeUpdateUserProfile({
      verifyTokenService: mockVerifyTokenService,
      updateUserProfileService: mockUpdateUserProfileService,
      updateAccountService: mockUpdateAccountService
    });

    // when
    try {
      await updateUserProfile(mockRequest);
      shouldNotToBeCalled;
    } catch (e) {
      expect(e).toBeInstanceOf(BadRequestError);
    } finally {
      expect(shouldNotToBeCalled).not.toBeCalled();
    }
  });

  test('should throw ForbiddenError when token id is not compatible with body id', async () => {
    // given
    const shouldNotToBeCalled = jest.fn();

    const mockId = 'mockId';
    const mockUserName = 'mockUserName';
    const mockAlias = 'mockAlias';
    const mockDescription = 'mockDes';
    const mockPostNum = 0;
    const mockFollowerNum = 0;
    const mockFollowingNum = 0;

    const mockRequest = ({
      headers: {
        authorization: 'mockAuth'
      },
      params: {
        userId: mockId
      },
      body: {
        id: mockId,
        userName: mockUserName,
        alias: mockAlias,
        description: mockDescription,
        postNum: mockPostNum,
        followerNum: mockFollowerNum,
        followingNum: mockFollowingNum
      } as UpdateUserProfileRequestBody
    } as unknown) as Request;

    const mockUpdateUserProfileService: UpdateUserProfileService = jest.fn();

    const mockVerifyTokenService: VerifyTokenService = jest.fn(() => 'mockId2');

    const mockUpdateAccountService: UpdateAccountService = jest.fn();

    const updateUserProfile = makeUpdateUserProfile({
      verifyTokenService: mockVerifyTokenService,
      updateUserProfileService: mockUpdateUserProfileService,
      updateAccountService: mockUpdateAccountService
    });

    // when
    try {
      await updateUserProfile(mockRequest);
      shouldNotToBeCalled();
    } catch (e) {
      expect(e).toBeInstanceOf(ForbiddenError);
    } finally {
      expect(shouldNotToBeCalled).not.toBeCalled();
    }
  });

  test('should response with correct status code and body when updateUserProfile invoke successfully', async () => {
    // given
    const mockId = 'mockId';
    const mockUserName = 'mockUserName';
    const mockAlias = 'mockAlias';
    const mockDescription = 'mockDes';
    const mockPostNum = 0;
    const mockFollowerNum = 0;
    const mockFollowingNum = 0;

    const mockRequest = ({
      headers: {
        authorization: 'mockAuth'
      },
      params: {
        userId: mockId
      },
      body: {
        id: mockId,
        userName: mockUserName,
        alias: mockAlias,
        description: mockDescription,
        postNum: mockPostNum,
        followerNum: mockFollowerNum,
        followingNum: mockFollowingNum
      } as UpdateUserProfileRequestBody
    } as unknown) as Request;

    const mockUpdateUserProfileService: UpdateUserProfileService = jest.fn(() =>
      Promise.resolve(mockId)
    );

    const mockVerifyTokenService: VerifyTokenService = jest.fn(() => mockId);

    const mockUpdateAccountService: UpdateAccountService = jest.fn();

    const updateUserProfile = makeUpdateUserProfile({
      verifyTokenService: mockVerifyTokenService,
      updateUserProfileService: mockUpdateUserProfileService,
      updateAccountService: mockUpdateAccountService
    });

    // when
    const result = updateUserProfile(mockRequest);

    // expect
    expect(result).resolves.toStrictEqual({
      headers: {
        'Content-Type': 'application/json'
      },
      status: 200,
      body: {
        userId: mockId
      }
    });
  });
});
