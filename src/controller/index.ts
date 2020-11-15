import {
  addNewAccount,
  addNewUserProfile,
  verifyAccount,
  generateToken
} from '../services';
import makeRegister from './register';
import makeLogin from './login';

const register = makeRegister({ addNewAccount, addNewUserProfile });

const login = makeLogin({ generateToken, verifyAccount });

export { register, login };
