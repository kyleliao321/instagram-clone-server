import { Request } from 'express';
import { NoContentError } from '../../utilities/http-error';
import {
  UpdateUserProfileRequestBody,
  UpdateUserProfileService
} from '../../utilities/types';
import makeUpdateUserProfile from './update-user-profile';

describe('update user profile controller', () => {
  test('should response with status code 500 when updateUserProfile throw non-http-error', async () => {
    // given
    const mockId = 'mockId';
    const mockUserName = 'mockUserName';
    const mockAlias = 'mockAlias';
    const mockDescription = 'mockDes';
    const mockPostNum = 0;
    const mockFollowerNum = 0;
    const mockFollowingNum = 0;

    const mockRequest = {
      body: {
        id: mockId,
        userName: mockUserName,
        alias: mockAlias,
        description: mockDescription,
        postNum: mockPostNum,
        followerNum: mockFollowerNum,
        followingNum: mockFollowingNum
      } as UpdateUserProfileRequestBody
    } as Request;

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

    const mockRequest = {
      body: {
        id: mockId,
        userName: mockUserName,
        alias: mockAlias,
        description: mockDescription,
        postNum: mockPostNum,
        followerNum: mockFollowerNum,
        followingNum: mockFollowingNum
      } as UpdateUserProfileRequestBody
    } as Request;

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

    const mockRequest = {
      body: {
        id: mockId,
        userName: mockUserName,
        alias: mockAlias,
        description: mockDescription,
        postNum: mockPostNum,
        followerNum: mockFollowerNum,
        followingNum: mockFollowingNum
      } as UpdateUserProfileRequestBody
    } as Request;

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
