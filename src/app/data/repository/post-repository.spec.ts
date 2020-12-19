import { NewPost, PostDao } from '../../utilities/types';
import makeBuildPostRepository from './post-repository';

describe('post-repository', () => {
  test('should trigger postDao.insert while invoke insertNewPost', async () => {
    // given
    const mockNewPost: NewPost = {
      getId: jest.fn(),
      getDescription: jest.fn(),
      getLocation: jest.fn(),
      getEncodedImage: jest.fn(),
      getPostedUserId: jest.fn(),
      getTimeStamp: jest.fn()
    };

    const mockPostDao: PostDao = {
      insert: jest.fn(),
      getOne: jest.fn(),
      filterByPostedUserId: jest.fn()
    };

    const buildPostRepository = makeBuildPostRepository({
      postDao: mockPostDao
    });

    const postRepository = buildPostRepository();

    // when
    await postRepository.insertNewPost(mockNewPost);

    // expect
    expect(mockPostDao.insert).toBeCalledTimes(1);
  });

  test('should trigger postDao.getOne while invoke getPost', async () => {
    // given
    const mockPostId = 'mockPostId';

    const mockPostDao: PostDao = {
      insert: jest.fn(),
      getOne: jest.fn(),
      filterByPostedUserId: jest.fn()
    };

    const buildPostRepository = makeBuildPostRepository({
      postDao: mockPostDao
    });

    const postRepository = buildPostRepository();

    // when
    await postRepository.getPost(mockPostId);

    // expect
    expect(mockPostDao.getOne).toBeCalledTimes(1);
  });

  test('should trigger postDao.insert while invoke insertNewPost', async () => {
    // given
    const mockUserId = 'mockUserId';

    const mockPostDao: PostDao = {
      insert: jest.fn(),
      getOne: jest.fn(),
      filterByPostedUserId: jest.fn()
    };

    const buildPostRepository = makeBuildPostRepository({
      postDao: mockPostDao
    });

    const postRepository = buildPostRepository();

    // when
    await postRepository.getPosts(mockUserId);

    // expect
    expect(mockPostDao.filterByPostedUserId).toBeCalledTimes(1);
  });
});
