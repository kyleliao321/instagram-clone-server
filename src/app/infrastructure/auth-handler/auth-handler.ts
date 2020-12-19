import * as jwt from 'jsonwebtoken';
import { Secret, SignOptions, VerifyOptions } from 'jsonwebtoken';
import { AuthHandler } from '../../utilities/types';
import { UnauthorizedError } from '../../utilities/http-error';

export default function makeAuthHandler(): AuthHandler {
  return Object.freeze({
    sign,
    verify
  });

  function sign(
    payload: Record<string, unknown>,
    key: Secret,
    options?: SignOptions
  ): string {
    return jwt.sign(payload, key, options);
  }

  function verify(
    token: string,
    key: Secret,
    options?: VerifyOptions
  ): string | unknown {
    try {
      return jwt.verify(token, key, options);
    } catch (e) {
      throw new UnauthorizedError(
        `Http.UnauthorizedError: token ${token} is invalid.`
      );
    }
  }
}
