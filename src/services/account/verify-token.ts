import { AuthenticationError } from '../../utilities/http-error';
import { AuthHandler, VerifyTokenService } from '../../utilities/types';

export default function makeVerifyTokenService(dependency: {
  authHandler: AuthHandler;
  key: string;
}): VerifyTokenService {
  return function verifyTokenService(bearerHeader?: string): string {
    // check if the header has authentication information
    if (bearerHeader === undefined) {
      throw new AuthenticationError(
        'HttpError.AutenticationError: trying to access private route.'
      );
    }

    const bearer = bearerHeader.split(' ')[0];

    // check if the authentication token is in right format
    if (!bearer || bearer !== 'bearer') {
      throw new AuthenticationError(
        `HttpError.AutenticationError: bearer header ${bearerHeader} is not in right format.`
      );
    }

    const token = bearerHeader.split(' ')[1];

    if (!token) {
      throw new AuthenticationError(
        `HttpError.AutenticationError: bearer header ${bearerHeader} is not in right format.`
      );
    }

    try {
      const decoded = dependency.authHandler.verify(token, dependency.key) as {
        userId: string;
      };

      if (decoded.userId === undefined) {
        throw new Error();
      }

      return decoded.userId;
    } catch (e) {
      throw new AuthenticationError(
        `HttpError.AuthenticationError: token ${token} is not valid.`
      );
    }
  };
}
