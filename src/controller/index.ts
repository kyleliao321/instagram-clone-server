import { addNewAccount, addNewUserProfile } from '../services';
import makeRegister from './register';

const register = makeRegister({ addNewAccount, addNewUserProfile });

export {
    register
}