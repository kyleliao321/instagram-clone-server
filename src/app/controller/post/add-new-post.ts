import { Request } from 'express';
import {
  AddNewPostService,
  Controller,
  HttpResponse,
  VerifyTokenService,
  AddNewPostResponseBody,
  AddNewPostRequestBody
} from '../../utilities/types';
import { UnauthorizedError } from '../../utilities/http-error';

export default function makeAddNewPost(dependencies: {
  verifyTokenService: VerifyTokenService;
  addNewPostService: AddNewPostService;
}): Controller<HttpResponse<AddNewPostResponseBody>> {
  return async function addNewPost(
    req: Request
  ): Promise<HttpResponse<AddNewPostResponseBody>> {
    const tokenUserId = dependencies.verifyTokenService(
      req.headers.authorization
    );

    const data: AddNewPostRequestBody = req.body;

    if (tokenUserId !== data.postedUserId) {
      throw new UnauthorizedError(
        `${tokenUserId}(user-id) is trying to act as ${data.postedUserId} to add new post.`
      );
    }

    const addedPost = await dependencies.addNewPostService(data);

    return Object.freeze({
      headers: {
        'Content-Type': 'application/json'
      },
      status: 201,
      body: {
        id: addedPost.getId(),
        description: addedPost.getDescription(),
        location: addedPost.getLocation(),
        timestamp: addedPost.getTimeStamp(),
        imageSrc: addedPost.getImageSrc(),
        postedUserId: addedPost.getPostedUserId()
      }
    });
  };
}
