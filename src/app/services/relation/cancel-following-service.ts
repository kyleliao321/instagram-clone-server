import {
  BuildQueryUserProfile,
  CacnelFollowingService,
  CacnelFollowingServiceInfo,
  QueryUserProfile,
  RelationRepository
} from '../../utilities/types';

export default function makeCancelFollowingService(dependencies: {
  buildQueryUserProfile: BuildQueryUserProfile;
  relationRepository: RelationRepository;
}): CacnelFollowingService {
  return async function cancelFollowingService(
    cancelFollowingServiceInfo: CacnelFollowingServiceInfo
  ): Promise<QueryUserProfile[]> {
    const updatedFollowings = await dependencies.relationRepository.cancelFollowing(
      cancelFollowingServiceInfo.followerId,
      cancelFollowingServiceInfo.followingId
    );

    return updatedFollowings.map((userProfile) =>
      dependencies.buildQueryUserProfile({
        id: userProfile.id,
        userName: userProfile.userName,
        alias: userProfile.alias,
        description: userProfile.description,
        imageSrc: userProfile.imageSrc,
        postNum: userProfile.postNum,
        followerNum: userProfile.followerNum,
        followingNum: userProfile.followingNum
      })
    );
  };
}
