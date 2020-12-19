import { ImageHandler } from '../../utilities/types';

export default function makeImageHandler(): ImageHandler {
  return Object.freeze({
    isValid: () => true
  });
}
