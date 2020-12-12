import { build } from 'joi';
import { RelationDao } from '../../utilities/types';
import makeBuildRelationRepository from './relation-repository';

describe('relation-repository', () => {
  test('should trigger relationDao.insert while invoke followUser', async () => {
    // given
    const mockFollowerId = 'mockFollowerId';
    const mockFollowingId = 'mockFollowingId';

    const mockRelationDao: RelationDao = {
      insert: jest.fn(),
      remove: jest.fn(),
      filterByFollowerId: jest.fn(),
      filterByFollowingId: jest.fn()
    };

    const buildRelationRepository = makeBuildRelationRepository({
      relationDao: mockRelationDao
    });
    const relationRepository = buildRelationRepository();

    // when
    await relationRepository.followUser(mockFollowerId, mockFollowingId);

    // expect
    expect(mockRelationDao.insert).toHaveBeenCalledTimes(1);
  });

  test('should trigger relationDao.remove while invoke cancelFollowing', async () => {
    // given
    const mockFollowerId = 'mockFollowerId';
    const mockFollowingId = 'mockFollowingId';

    const mockRelationDao: RelationDao = {
      insert: jest.fn(),
      remove: jest.fn(),
      filterByFollowerId: jest.fn(),
      filterByFollowingId: jest.fn()
    };

    const buildRelationRepository = makeBuildRelationRepository({
      relationDao: mockRelationDao
    });
    const relationRepository = buildRelationRepository();

    // when
    await relationRepository.cancelFollowing(mockFollowerId, mockFollowingId);

    // expect
    expect(mockRelationDao.remove).toHaveBeenCalledTimes(1);
  });

  test('should trigger relationDao.filterByFollowingId while invoke getFollowers', async () => {
    // given
    const mockUserId = 'mockUserId';

    const mockRelationDao: RelationDao = {
      insert: jest.fn(),
      remove: jest.fn(),
      filterByFollowerId: jest.fn(),
      filterByFollowingId: jest.fn()
    };

    const buildRelationRepository = makeBuildRelationRepository({
      relationDao: mockRelationDao
    });
    const relationRepository = buildRelationRepository();

    // when
    await relationRepository.getFollowers(mockUserId);

    // expect
    expect(mockRelationDao.filterByFollowingId).toHaveBeenCalledTimes(1);
  });

  test('should trigger relationDao.filterByFollowerId while invoke getFollowings', async () => {
    // given
    const mockUserId = 'mockUserId';

    const mockRelationDao: RelationDao = {
      insert: jest.fn(),
      remove: jest.fn(),
      filterByFollowerId: jest.fn(),
      filterByFollowingId: jest.fn()
    };

    const buildRelationRepository = makeBuildRelationRepository({
      relationDao: mockRelationDao
    });
    const relationRepository = buildRelationRepository();

    // when
    await relationRepository.getFollowings(mockUserId);

    // expect
    expect(mockRelationDao.filterByFollowerId).toHaveBeenCalledTimes(1);
  });
});
