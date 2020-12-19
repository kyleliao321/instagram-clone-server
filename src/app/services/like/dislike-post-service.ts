import {
  BuildQueryUserProfile,
  DislikePostService,
  DislikePostServiceInfo,
  LikeSystemRepository,
  QueryUserProfile
} from '../../utilities/types';

export default function makeDisikePostService(dependencies: {
  buildQueryUserProfile: BuildQueryUserProfile;
  likeSystemRepository: LikeSystemRepository;
}): DislikePostService {
  return async function dislikePostService(
    dislikePostServiceInfo: DislikePostServiceInfo
  ): Promise<QueryUserProfile[]> {
    const likedUsers = await dependencies.likeSystemRepository.dislikePost(
      dislikePostServiceInfo.userId,
      dislikePostServiceInfo.postId
    );

    return likedUsers.map((userProfile) =>
      dependencies.buildQueryUserProfile(userProfile)
    );
  };
}
