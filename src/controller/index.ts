import {
  addNewAccount,
  addNewUserProfile,
  getUserProfileById,
  verifyAccount,
  generateToken
} from '../services';
import makeRegister from './register';
import makeLogin from './login';
import makeGetUserProfile from './get-user-profile';

const register = makeRegister({ addNewAccount, addNewUserProfile });

const login = makeLogin({ generateToken, verifyAccount });

const getUserProfile = makeGetUserProfile({ getUserProfileById });

export { register, login, getUserProfile };
