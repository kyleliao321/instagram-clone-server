import {
  BuildGetFeedQuery,
  GetFeedQuery,
  GetFeedQueryInfo
} from '../../utilities/types';

export default function makeBuildGetFeedQuery(dependencies: {
  defaultPageSize: number;
}): BuildGetFeedQuery {
  return function buildGetFeedQuery(info: GetFeedQueryInfo): GetFeedQuery {
    if (info.before !== undefined && info.after !== undefined) {
      throw new Error(
        'cursor pagination query should specified only one break point for either before or after.'
      );
    }

    if (info.pageSize !== undefined && info.pageSize <= 0) {
      throw new Error('cannot get page that is smaller than zero.');
    }

    return Object.freeze({
      userId: () => info.userId,
      before: () => info.before ?? null,
      after: () => info.after ?? null,
      pageSize: () => info.pageSize ?? dependencies.defaultPageSize
    });
  };
}
