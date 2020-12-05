import { Request } from 'express';
import {
  Controller,
  GetPostListService,
  GetPostsRequestBody,
  GetPostsResponseBody,
  HttpResponse
} from '../../utilities/types';

export default function makeGetPosts(dependencies: {
  getPostListService: GetPostListService;
}): Controller<HttpResponse<GetPostsResponseBody>> {
  return async function getPosts(
    req: Request
  ): Promise<HttpResponse<GetPostsResponseBody>> {
    const data: GetPostsRequestBody = req.body;

    const queryPosts = await dependencies.getPostListService(data.userId);

    return Object.freeze({
      headers: {
        'Content-Type': 'application/json'
      },
      status: 200,
      body: {
        posts: queryPosts.map((post) => {
          return {
            id: post.getId(),
            description: post.getDescription(),
            location: post.getLocation(),
            timestamp: post.getTimeStamp(),
            imageSrc: post.getImageSrc(),
            postedUserId: post.getPostedUserId()
          };
        })
      }
    });
  };
}
