import { Request } from 'express';
import {
  Controller,
  GetPostRequestBody,
  GetPostResponseBody,
  GetPostService,
  HttpResponse
} from '../../utilities/types';
import { BadRequestError } from '../../utilities/http-error';

export default function makeGetPost(dependencies: {
  getPostService: GetPostService;
}): Controller<HttpResponse<GetPostResponseBody>> {
  return async function getPost(
    req: Request
  ): Promise<HttpResponse<GetPostResponseBody>> {
    const pathPostId: string = req.params.postId;

    const data: GetPostRequestBody = req.body;

    if (pathPostId !== data.postId) {
      throw new BadRequestError(
        `${pathPostId}(post-id) in params is not compatible with ${data.postId}(post-id) in body.`
      );
    }

    const queryPost = await dependencies.getPostService(data.postId);

    return Object.freeze({
      headers: {
        'Content-Type': 'application/json'
      },
      status: 200,
      body: {
        id: queryPost.getId(),
        description: queryPost.getDescription(),
        location: queryPost.getLocation(),
        timestamp: queryPost.getTimeStamp(),
        imageSrc: queryPost.getImageSrc(),
        postedUserId: queryPost.getPostedUserId()
      }
    });
  };
}
