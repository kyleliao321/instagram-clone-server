import { LikeSystemDao } from '../../utilities/types';
import makeBuildLikeSystemRepository from './like-system-repository';

describe('like-system-repository', () => {
  test('should trigger likeSystemDao.insert while invoke likePost', async () => {
    // given
    const mockUserId = 'mockUserId';
    const mockPostId = 'mockPostId';

    const likeSystemDao: LikeSystemDao = {
      insert: jest.fn(),
      remove: jest.fn(),
      filterByPostId: jest.fn()
    };

    const buildLikeSystemRepository = makeBuildLikeSystemRepository({
      likeSystemDao
    });

    const likeSystemRepository = buildLikeSystemRepository();

    // when
    await likeSystemRepository.likePost(mockUserId, mockPostId);

    // expect
    expect(likeSystemDao.insert).toBeCalledTimes(1);
  });

  test('should trigger likeSystemDao.remove while invoke dislikePost', async () => {
    // given
    const mockUserId = 'mockUserId';
    const mockPostId = 'mockPostId';

    const likeSystemDao: LikeSystemDao = {
      insert: jest.fn(),
      remove: jest.fn(),
      filterByPostId: jest.fn()
    };

    const buildLikeSystemRepository = makeBuildLikeSystemRepository({
      likeSystemDao
    });

    const likeSystemRepository = buildLikeSystemRepository();

    // when
    await likeSystemRepository.dislikePost(mockUserId, mockPostId);

    // expect
    expect(likeSystemDao.remove).toBeCalledTimes(1);
  });

  test('should trigger likeSystemDao.filterByPostId while invoke getLikedUsers', async () => {
    // given
    const mockPostId = 'mockPostId';

    const likeSystemDao: LikeSystemDao = {
      insert: jest.fn(),
      remove: jest.fn(),
      filterByPostId: jest.fn()
    };

    const buildLikeSystemRepository = makeBuildLikeSystemRepository({
      likeSystemDao
    });

    const likeSystemRepository = buildLikeSystemRepository();

    // when
    await likeSystemRepository.getLikedUsers(mockPostId);

    // expect
    expect(likeSystemDao.filterByPostId).toBeCalledTimes(1);
  });
});
