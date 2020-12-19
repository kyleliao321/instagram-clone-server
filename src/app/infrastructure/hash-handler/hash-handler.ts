import { HashHandler } from '../../utilities/types';
import crypto from 'crypto';

export default function makeBuildHashHandler() {
  return function buildHashHandler(): HashHandler {
    return Object.freeze({
      hash
    });

    function hash(input: string): string {
      const h = crypto.createHash('sha256');
      h.update(input);
      return h.digest().toString();
    }
  };
}
