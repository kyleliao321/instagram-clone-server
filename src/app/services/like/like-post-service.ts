import {
  BuildQueryUserProfile,
  LikePostService,
  LikePostServiceInfo,
  LikeSystemRepository,
  QueryUserProfile
} from '../../utilities/types';

export default function makeLikePostService(dependencies: {
  buildQueryUserProfile: BuildQueryUserProfile;
  likeSystemRepository: LikeSystemRepository;
}): LikePostService {
  return async function likePostService(
    likePostServiceInfo: LikePostServiceInfo
  ): Promise<QueryUserProfile[]> {
    const likedUsers = await dependencies.likeSystemRepository.likePost(
      likePostServiceInfo.userId,
      likePostServiceInfo.postId
    );

    return likedUsers.map((userProfile) =>
      dependencies.buildQueryUserProfile(userProfile)
    );
  };
}
