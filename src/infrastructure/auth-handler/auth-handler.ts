import * as jwt from 'jsonwebtoken';
import { Secret, SignOptions, VerifyOptions } from 'jsonwebtoken';
import { AuthHandler } from '../../utilities/types';

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
    return jwt.verify(token, key, options);
  }
}
