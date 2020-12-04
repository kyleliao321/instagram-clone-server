import {
  BuildQueryUserProfile,
  GetFollowingListService,
  QueryUserProfile,
  RelationRepository
} from '../../utilities/types';

export default function makeGetFollowingListService(dependencies: {
  buildQueryUserProfile: BuildQueryUserProfile;
  relationRepository: RelationRepository;
}): GetFollowingListService {
  return async function getFollowingListService(
    userId: string
  ): Promise<QueryUserProfile[]> {
    const followings = await dependencies.relationRepository.getFollowings(
      userId
    );

    return followings.map((userProfile) =>
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
