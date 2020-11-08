import { HashHandler } from '../utilities/types';

export default function makeHashHandler(): HashHandler {
  return Object.freeze({
    hash: (input: string) => 'hashed' + input
  });
}
