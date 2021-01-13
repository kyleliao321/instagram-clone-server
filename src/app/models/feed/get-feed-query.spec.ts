import { BuildGetFeedQuery, GetFeedQueryInfo } from '../../utilities/types';
import makeBuildGetFeedQuery from './get-feed-query';

describe('get-feed-query-test', () => {
  let buildGetFeedQuery: BuildGetFeedQuery;

  const defaultPageSize = 10;

  beforeAll(() => {
    buildGetFeedQuery = makeBuildGetFeedQuery({ defaultPageSize });
  });

  test('getFeedQuery.after and pageSize should return given input when provided information is not undefined', () => {
    // given
    const info: GetFeedQueryInfo = {
      userId: 'mockUserId',
      after: 'mockAfter',
      pageSize: 20
    };

    // when
    const result = buildGetFeedQuery(info);

    // expect
    expect(result.userId()).toBe(info.userId);
    expect(result.before()).toBe(null);
    expect(result.after()).toBe(info.after);
    expect(result.pageSize()).toBe(info.pageSize);
  });

  test('getFeedQuery.after and pageSize should return null and default value if given information is undefined', () => {
    // given
    const info: GetFeedQueryInfo = {
      userId: 'mockUserId'
    };

    // when
    const result = buildGetFeedQuery(info);

    // expect
    expect(result.userId()).toBe(info.userId);
    expect(result.before()).toBe(null);
    expect(result.after()).toBe(null);
    expect(result.pageSize()).toBe(defaultPageSize);
  });

  test('getFeedQuery.before and pageSize should return given input when provided information is not undefined', () => {
    // given
    const info: GetFeedQueryInfo = {
      userId: 'mockUserId',
      before: 'mockBefore',
      pageSize: 20
    };

    // when
    const result = buildGetFeedQuery(info);

    // expect
    expect(result.userId()).toBe(info.userId);
    expect(result.before()).toBe(info.before);
    expect(result.after()).toBe(null);
    expect(result.pageSize()).toBe(info.pageSize);
  });

  test('getFeedQuery.before and pageSize should return null and default value if given information is undefined', () => {
    // given
    const info: GetFeedQueryInfo = {
      userId: 'mockUserId'
    };

    // when
    const result = buildGetFeedQuery(info);

    // expect
    expect(result.userId()).toBe(info.userId);
    expect(result.before()).toBe(null);
    expect(result.after()).toBe(null);
    expect(result.pageSize()).toBe(defaultPageSize);
  });

  test('should throw an error when both before and after are given information', () => {
    // given
    const shouldNotBeCalled = jest.fn();

    const info: GetFeedQueryInfo = {
      userId: 'mockUserId',
      before: 'mockBefore',
      after: 'mockAfter',
      pageSize: 20
    };

    // when
    try {
      buildGetFeedQuery(info);
      shouldNotBeCalled();
    } catch (e) {
      expect(e).toBeInstanceOf(Error);
      expect(e.message).toBe(
        'cursor pagination query should specified only one break point for either before or after.'
      );
    } finally {
      expect(shouldNotBeCalled).not.toBeCalled();
    }
  });

  test('should throw an error when provided pageSize is smaller than one', () => {
    // given
    const shouldNotBeCalled = jest.fn();

    const info: GetFeedQueryInfo = {
      userId: 'mockUserId',
      after: 'mockAfter',
      pageSize: 0
    };

    // when
    try {
      buildGetFeedQuery(info);
      shouldNotBeCalled();
    } catch (e) {
      expect(e).toBeInstanceOf(Error);
      expect(e.message).toBe('cannot get page that is smaller than zero.');
    } finally {
      expect(shouldNotBeCalled).not.toBeCalled();
    }
  });
});
