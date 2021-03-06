import { UpdateUserProfileServiceInfo } from '../../types';
import { UpdateUserProfileRequestBodySchema } from '../schemas';

describe('update user profile request schema', () => {
  test('validation should fail when postNum is negtive', () => {
    // given
    const mockId = 'mockId';
    const mockUserName = 'mockUserName';
    const mockAlias = 'mockAlias';
    const mockDescription = 'mockDes';
    const mockEncodedImage = 'mockEncodedImage';
    const mockPostNum = -1;
    const mockFollowerNum = 0;
    const mockFollowingNum = 0;

    const data: UpdateUserProfileServiceInfo = {
      id: mockId,
      userName: mockUserName,
      alias: mockAlias,
      description: mockDescription,
      encodedImage: mockEncodedImage,
      postNum: mockPostNum,
      followerNum: mockFollowerNum,
      followingNum: mockFollowingNum
    };

    // when
    const { error } = UpdateUserProfileRequestBodySchema.validate(data);

    // expect
    expect(error === undefined).toBe(false);
  });

  test('validation should fail when id is blank', () => {
    // given
    const mockId = '';
    const mockUserName = 'mockUserName';
    const mockAlias = 'mockAlias';
    const mockDescription = 'mockDes';
    const mockEncodedImage = 'mockEncodedImage';
    const mockPostNum = 0;
    const mockFollowerNum = 0;
    const mockFollowingNum = 0;

    const data: UpdateUserProfileServiceInfo = {
      id: mockId,
      userName: mockUserName,
      alias: mockAlias,
      description: mockDescription,
      encodedImage: mockEncodedImage,
      postNum: mockPostNum,
      followerNum: mockFollowerNum,
      followingNum: mockFollowingNum
    };

    // when
    const { error } = UpdateUserProfileRequestBodySchema.validate(data);

    // expect
    expect(error === undefined).toBe(false);
  });

  test('validation should fail when userName is blank', () => {
    // given
    const mockId = 'mockId';
    const mockUserName = '';
    const mockAlias = 'mockAlias';
    const mockDescription = 'mockDes';
    const mockEncodedImage = 'mockEncodedImage';
    const mockPostNum = -1;
    const mockFollowerNum = 0;
    const mockFollowingNum = 0;

    const data: UpdateUserProfileServiceInfo = {
      id: mockId,
      userName: mockUserName,
      alias: mockAlias,
      description: mockDescription,
      encodedImage: mockEncodedImage,
      postNum: mockPostNum,
      followerNum: mockFollowerNum,
      followingNum: mockFollowingNum
    };

    // when
    const { error } = UpdateUserProfileRequestBodySchema.validate(data);

    // expect
    expect(error === undefined).toBe(false);
  });

  test('validation should fail when alias is blank', () => {
    // given
    const mockId = 'mockId';
    const mockUserName = 'mockUserName';
    const mockAlias = '';
    const mockDescription = 'mockDes';
    const mockEncodedImage = 'mockEncodedImage';
    const mockPostNum = 0;
    const mockFollowerNum = 0;
    const mockFollowingNum = 0;

    const data: UpdateUserProfileServiceInfo = {
      id: mockId,
      userName: mockUserName,
      alias: mockAlias,
      description: mockDescription,
      encodedImage: mockEncodedImage,
      postNum: mockPostNum,
      followerNum: mockFollowerNum,
      followingNum: mockFollowingNum
    };

    // when
    const { error } = UpdateUserProfileRequestBodySchema.validate(data);

    // expect
    expect(error === undefined).toBe(false);
  });

  test('validation should succeed in edge-case', () => {
    // given
    const mockId = 'c';
    const mockUserName = 'c';
    const mockAlias = 'c';
    const mockDescription = '';
    const mockPostNum = 0;
    const mockFollowerNum = 0;
    const mockFollowingNum = 0;

    const data: UpdateUserProfileServiceInfo = {
      id: mockId,
      userName: mockUserName,
      alias: mockAlias,
      description: mockDescription,
      postNum: mockPostNum,
      followerNum: mockFollowerNum,
      followingNum: mockFollowingNum
    };

    // when
    const { error } = UpdateUserProfileRequestBodySchema.validate(data);

    // expect
    expect(error === undefined).toBe(true);
  });

  test('validation should succed when only id is provided', () => {
    // given
    const mockId = 'c';

    const data: UpdateUserProfileServiceInfo = {
      id: mockId
    };

    // when
    const { error } = UpdateUserProfileRequestBodySchema.validate(data);

    // expect
    expect(error === undefined).toBe(true);
  });
});
