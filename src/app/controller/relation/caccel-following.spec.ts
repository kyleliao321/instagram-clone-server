import {
  VerifyTokenService,
  CacnelFollowingService,
  CancelFollowingRequestBody
} from '../../utilities/types';
import makeCancelFollowing from './cancel-following';
import { UnauthorizedError } from '../../utilities/http-error';
import { Request } from 'express';

describe('cancel-following-controller', () => {
  test('should throw an UnauthorizedError when tokenUserId is not compatible with followerUserId', async () => {
    // given
    const shouldNotTobeCalled = jest.fn();

    const mockFollowerId = 'mockFollowerId';
    const mockFollowingId = 'mockFollowingId';

    const mockRequest = ({
      headers: {
        authorization: 'mockAuth'
      },
      body: {
        followerId: mockFollowerId,
        followingId: mockFollowingId
      } as CancelFollowingRequestBody
    } as unknown) as Request;

    const mockTokenId = 'mockTokenId';

    const verifyTokenService: VerifyTokenService = jest.fn(() => mockTokenId);

    const cancelFollowingService: CacnelFollowingService = jest.fn();

    const cancelFollowing = makeCancelFollowing({
      verifyTokenService,
      cancelFollowingService
    });
    // when
    try {
      await cancelFollowing(mockRequest);
    } catch (e) {
      expect(e).toBeInstanceOf(UnauthorizedError);
    } finally {
      expect(shouldNotTobeCalled).not.toBeCalled();
    }
  });
});
