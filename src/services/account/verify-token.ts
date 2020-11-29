import { UnauthorizedError } from '../../utilities/http-error';
import { AuthHandler, VerifyTokenService } from '../../utilities/types';

export default function makeVerifyTokenService(dependency: {
  authHandler: AuthHandler;
  key: string;
}): VerifyTokenService {
  return function verifyTokenService(bearerHeader?: string): string {
    // check if the header has authentication information
    if (bearerHeader === undefined) {
      throw new UnauthorizedError(
        'HttpError.UnauthorizedError: trying to access private route.'
      );
    }

    const bearer = bearerHeader.split(' ')[0];

    // check if the authentication token is in right format
    if (!bearer || bearer !== 'bearer') {
      throw new UnauthorizedError(
        `HttpError.UnauthorizedError: bearer header ${bearerHeader} is not in right format.`
      );
    }

    const token = bearerHeader.split(' ')[1];

    if (!token) {
      throw new UnauthorizedError(
        `HttpError.UnauthorizedError: bearer header ${bearerHeader} is not in right format.`
      );
    }

    const decoded = dependency.authHandler.verify(token, dependency.key) as {
      userId?: string;
    };

    if (decoded.userId === undefined) {
      throw new UnauthorizedError(
        `HttpError.UnauthorizedError: token ${token} is invalid.`
      );
    }

    return decoded.userId;
  };
}
