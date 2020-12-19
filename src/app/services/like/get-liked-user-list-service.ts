import {
  BuildQueryUserProfile,
  GetLikedUserListService,
  LikeSystemRepository,
  QueryUserProfile
} from '../../utilities/types';

export default function makeGetLikedUserListService(dependencies: {
  buildQueryUserProfile: BuildQueryUserProfile;
  likeSystemRepository: LikeSystemRepository;
}): GetLikedUserListService {
  return async function getLikedUserListService(
    postId: string
  ): Promise<QueryUserProfile[]> {
    const likedUsers = await dependencies.likeSystemRepository.getLikedUsers(
      postId
    );

    return likedUsers.map((userProfile) =>
      dependencies.buildQueryUserProfile(userProfile)
    );
  };
}
