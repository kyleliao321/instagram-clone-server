import {
  BuildQueryUserProfile,
  GetFollowerListService,
  QueryUserProfile,
  RelationRepository
} from '../../utilities/types';

export default function makeGetFollowerListService(dependencies: {
  buildQueryUserProfile: BuildQueryUserProfile;
  relationRepository: RelationRepository;
}): GetFollowerListService {
  return async function getFollowerListService(
    userId: string
  ): Promise<QueryUserProfile[]> {
    const followers = await dependencies.relationRepository.getFollowers(
      userId
    );

    return followers.map((userProfile) =>
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
