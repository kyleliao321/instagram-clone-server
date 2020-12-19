import {
  BuildQueryUserProfile,
  FollowUserService,
  FollowUserServiceInfo,
  QueryUserProfile,
  RelationRepository
} from '../../utilities/types';

export default function makeFollowUserService(dependencies: {
  buildQueryUserProfile: BuildQueryUserProfile;
  relationRepository: RelationRepository;
}): FollowUserService {
  return async function followUserService(
    followUserInfo: FollowUserServiceInfo
  ): Promise<QueryUserProfile[]> {
    const updatedFollowings = await dependencies.relationRepository.followUser(
      followUserInfo.followerId,
      followUserInfo.followingId
    );

    return updatedFollowings.map((userProfile) =>
      dependencies.buildQueryUserProfile({
        id: userProfile.id,
        userName: userProfile.userName,
        alias: userProfile.alias,
        description: userProfile.alias,
        imageSrc: userProfile.imageSrc,
        postNum: userProfile.postNum,
        followerNum: userProfile.followerNum,
        followingNum: userProfile.followingNum
      })
    );
  };
}
