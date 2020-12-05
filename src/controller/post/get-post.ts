import { Request } from 'express';
import {
  Controller,
  GetPostRequestBody,
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
    const data: GetPostRequestBody = req.body;

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
