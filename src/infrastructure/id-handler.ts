import { IdHandler } from '../utilities/types';

export default function makeIdHandler(): IdHandler {
    return Object.freeze({
        getId: () => 'mockId',
        isValid: () => true
    })
}