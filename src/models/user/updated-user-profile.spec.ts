import { IdHandler } from '../../utilities/types';
import buildMakeUpdatedUserProfile from './updated-user-profile';

describe('updated user profile', () => {
  test('should throw an error when updated user id is not valid', () => {
    // given
    const mockId = 'mockId';
    const mockUserName = 'mockUserName';
    const mockAlias = 'mockAlias';
    const mockDescription = 'mockDes';
    const mockPostNum = 0;
    const mockFollowerNum = 0;
    const mockFollowingNum = 0;

    const mockIdHandler = ({
      isValid: jest.fn(() => false)
    } as unknown) as IdHandler;

    const makeUpdatedUserProfile = buildMakeUpdatedUserProfile({
      idHandler: mockIdHandler
    });

    // when
    expect(() => {
      makeUpdatedUserProfile({
        id: mockId,
        userName: mockUserName,
        alias: mockAlias,
        description: mockDescription,
        postNum: mockPostNum,
        followerNum: mockFollowerNum,
        followingNum: mockFollowingNum
      });
    }).toThrow('Updated User Profile must have a valid id.');
  });

  test('should throw an error when updated user profile has negtive posts', () => {
    // given
    const mockId = 'mockId';
    const mockUserName = 'mockUserName';
    const mockAlias = 'mockAlias';
    const mockDescription = 'mockDes';
    const mockPostNum = -1;
    const mockFollowerNum = 0;
    const mockFollowingNum = 0;

    const mockIdHandler = ({
      isValid: jest.fn(() => true)
    } as unknown) as IdHandler;

    const makeUpdatedUserProfile = buildMakeUpdatedUserProfile({
      idHandler: mockIdHandler
    });

    // when
    expect(() => {
      makeUpdatedUserProfile({
        id: mockId,
        userName: mockUserName,
        alias: mockAlias,
        description: mockDescription,
        postNum: mockPostNum,
        followerNum: mockFollowerNum,
        followingNum: mockFollowingNum
      });
    }).toThrow(
      'Updated User Profile must have positive or at least zero posts.'
    );
  });

  test('should throw an error when updated user profile has negtive followers', () => {
    // given
    const mockId = 'mockId';
    const mockUserName = 'mockUserName';
    const mockAlias = 'mockAlias';
    const mockDescription = 'mockDes';
    const mockPostNum = 0;
    const mockFollowerNum = -1;
    const mockFollowingNum = 0;

    const mockIdHandler = ({
      isValid: jest.fn(() => true)
    } as unknown) as IdHandler;

    const makeUpdatedUserProfile = buildMakeUpdatedUserProfile({
      idHandler: mockIdHandler
    });

    // when
    expect(() => {
      makeUpdatedUserProfile({
        id: mockId,
        userName: mockUserName,
        alias: mockAlias,
        description: mockDescription,
        postNum: mockPostNum,
        followerNum: mockFollowerNum,
        followingNum: mockFollowingNum
      });
    }).toThrow(
      'Updated User Profile must have positive or at least zero followers.'
    );
  });

  test('should throw an error when updated user profile has negtive followings', () => {
    // given
    const mockId = 'mockId';
    const mockUserName = 'mockUserName';
    const mockAlias = 'mockAlias';
    const mockDescription = 'mockDes';
    const mockPostNum = 0;
    const mockFollowerNum = 0;
    const mockFollowingNum = -1;

    const mockIdHandler = ({
      isValid: jest.fn(() => true)
    } as unknown) as IdHandler;

    const makeUpdatedUserProfile = buildMakeUpdatedUserProfile({
      idHandler: mockIdHandler
    });

    // when
    expect(() => {
      makeUpdatedUserProfile({
        id: mockId,
        userName: mockUserName,
        alias: mockAlias,
        description: mockDescription,
        postNum: mockPostNum,
        followerNum: mockFollowerNum,
        followingNum: mockFollowingNum
      });
    }).toThrow(
      'Updated User Profile must have positive or at least zero followings.'
    );
  });

  test('should return correct result when invoke successfully', () => {
    // given
    const mockId = 'mockId';
    const mockUserName = 'mockUserName';
    const mockAlias = 'mockAlias';
    const mockDescription = 'mockDes';
    const mockPostNum = 0;
    const mockFollowerNum = 0;
    const mockFollowingNum = 0;

    const mockIdHandler = ({
      isValid: jest.fn(() => true)
    } as unknown) as IdHandler;

    const makeUpdatedUserProfile = buildMakeUpdatedUserProfile({
      idHandler: mockIdHandler
    });

    // when
    const result = makeUpdatedUserProfile({
      id: mockId,
      userName: mockUserName,
      alias: mockAlias,
      description: mockDescription,
      postNum: mockPostNum,
      followerNum: mockFollowerNum,
      followingNum: mockFollowingNum
    });

    // expect
    expect(result.getId()).toBe(mockId);
    expect(result.getUserName()).toBe(mockUserName);
    expect(result.getAlias()).toBe(mockAlias);
    expect(result.getDescription()).toBe(mockDescription);
    expect(result.getImageByteArray()).toBe(null);
    expect(result.getPostNum()).toBe(mockPostNum);
    expect(result.getFollowerNum()).toBe(mockFollowerNum);
    expect(result.getFollowingNum()).toBe(mockFollowingNum);
  });
});
