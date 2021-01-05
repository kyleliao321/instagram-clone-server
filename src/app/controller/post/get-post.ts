import { Request } from 'express';
import {
  Controller,
  GetPostResponseBody,
  GetPostService,
  HttpResponse
} from '../../utilities/types';

export default function makeGetPost(dependencies: {
  getPostService: GetPostService;
}): Controller<HttpResponse<GetPostResponseBody>> {
  return async function getPost(
    req: Request
  ): Promise<HttpResponse<GetPostResponseBody>> {
    const pathPostId: string = req.params.postId;

    const queryPost = await dependencies.getPostService(pathPostId);

    return Object.freeze({
      headers: {
        'Content-Type': 'application/json'
      },
      status: 200,
      body: {
        post: {
          id: queryPost.getId(),
          description: queryPost.getDescription(),
          location: queryPost.getLocation(),
          timestamp: queryPost.getTimeStamp(),
          imageSrc: queryPost.getImageSrc(),
          postedUserId: queryPost.getPostedUserId()
        }
      }
    });
  };
}
