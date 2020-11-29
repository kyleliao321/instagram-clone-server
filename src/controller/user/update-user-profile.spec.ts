import { Request } from 'express';
import { NoContentError, BadRequestError } from '../../utilities/http-error';
import {
  UpdateUserProfileRequestBody,
  UpdateUserProfileService
} from '../../utilities/types';
import makeUpdateUserProfile from './update-user-profile';

describe('update user profile controller', () => {
  test('should response with status code 400 when given id params are not compatible between path-param and body-param', async () => {
    // given
    const mockId = 'mockId';
    const mockUserName = 'mockUserName';
    const mockAlias = 'mockAlias';
    const mockDescription = 'mockDes';
    const mockPostNum = 0;
    const mockFollowerNum = 0;
    const mockFollowingNum = 0;

    const mockRequest = ({
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

    const updateUserProfile = makeUpdateUserProfile({
      updateUserProfileService: mockUpdateUserProfileService
    });

    // when
    const result = updateUserProfile(mockRequest);

    // expect
    expect(result).resolves.toStrictEqual({
      headers: {
        'Content-Type': 'application/json'
      },
      status: BadRequestError.STATUS_CODE
    });
  });

  test('should response with status code 500 when updateUserProfile throw non-http-error', async () => {
    // given
    const mockId = 'mockId';
    const mockUserName = 'mockUserName';
    const mockAlias = 'mockAlias';
    const mockDescription = 'mockDes';
    const mockPostNum = 0;
    const mockFollowerNum = 0;
    const mockFollowingNum = 0;

    const mockRequest = ({
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

    const mockUpdateUserProfileService: UpdateUserProfileService = jest.fn(
      () => {
        throw new Error();
      }
    );

    const updateUserProfile = makeUpdateUserProfile({
      updateUserProfileService: mockUpdateUserProfileService
    });

    // when
    const result = updateUserProfile(mockRequest);

    // expect
    expect(result).resolves.toStrictEqual({
      headers: {
        'Content-Type': 'application/json'
      },
      status: 500
    });
  });

  test('should response with correct status code when updateUserProfile throw http-error', async () => {
    // given
    const mockId = 'mockId';
    const mockUserName = 'mockUserName';
    const mockAlias = 'mockAlias';
    const mockDescription = 'mockDes';
    const mockPostNum = 0;
    const mockFollowerNum = 0;
    const mockFollowingNum = 0;

    const mockRequest = ({
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

    const mockUpdateUserProfileService: UpdateUserProfileService = jest.fn(
      () => {
        throw new NoContentError();
      }
    );

    const updateUserProfile = makeUpdateUserProfile({
      updateUserProfileService: mockUpdateUserProfileService
    });

    // when
    const result = updateUserProfile(mockRequest);

    // expect
    expect(result).resolves.toStrictEqual({
      headers: {
        'Content-Type': 'application/json'
      },
      status: NoContentError.STATUS_CODE
    });
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

    const updateUserProfile = makeUpdateUserProfile({
      updateUserProfileService: mockUpdateUserProfileService
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
