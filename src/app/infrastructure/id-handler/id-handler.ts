import { IdHandler } from '../../utilities/types';
import { v4 as uuidv4 } from 'uuid';
import { validate as uuidValidate } from 'uuid';

export default function makeIdHandler(): IdHandler {
  return Object.freeze({
    getId: () => uuidv4(),
    isValid: (id: string) => uuidValidate(id)
  });
}
