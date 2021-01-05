import { Request } from 'express';
import {
  AddNewPostService,
  Controller,
  HttpResponse,
  VerifyTokenService,
  AddNewPostResponseBody,
  AddNewPostRequestBody,
  GetUserProfileService,
  UpdateUserProfileService
} from '../../utilities/types';
import { UnauthorizedError } from '../../utilities/http-error';

export default function makeAddNewPost(dependencies: {
  verifyTokenService: VerifyTokenService;
  addNewPostService: AddNewPostService;
  getUserProfileByIdService: GetUserProfileService;
  updateUserProfileService: UpdateUserProfileService;
}): Controller<HttpResponse<AddNewPostResponseBody>> {
  return async function addNewPost(
    req: Request
  ): Promise<HttpResponse<AddNewPostResponseBody>> {
    const tokenUserId = dependencies.verifyTokenService(
      req.headers.authorization
    );

    const fileBuffer = req.file.buffer;

    const encodedImage = fileBuffer.toString('base64');

    const data: AddNewPostRequestBody = {
      ...req.body,
      encodedImage
    };

    if (tokenUserId !== data.postedUserId) {
      throw new UnauthorizedError(
        `${tokenUserId}(user-id) is trying to act as ${data.postedUserId} to add new post.`
      );
    }

    const addedPost = await dependencies.addNewPostService(data);

    const postedUserProfile = await dependencies.getUserProfileByIdService(
      data.postedUserId
    );

    await dependencies.updateUserProfileService({
      id: postedUserProfile.getId(),
      postNum: postedUserProfile.getPostNum() + 1
    });

    return Object.freeze({
      headers: {
        'Content-Type': 'application/json'
      },
      status: 201,
      body: {
        post: {
          id: addedPost.getId(),
          description: addedPost.getDescription(),
          location: addedPost.getLocation(),
          timestamp: addedPost.getTimeStamp(),
          imageSrc: addedPost.getImageSrc(),
          postedUserId: addedPost.getPostedUserId()
        }
      }
    });
  };
}
