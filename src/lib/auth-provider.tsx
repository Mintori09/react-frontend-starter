import { configureAuth } from 'react-query-auth';
import { setAccessToken } from './api-clients';
import {
  getUser,
  loginWithEmailAndPassword,
  registerWithEmailAndPassword,
  logout
} from './auth';
import type { LoginInput, RegisterInput } from './auth-schemas';

const authConfig = {
    userFn: getUser,
    loginFn: async (data: LoginInput) => {
        const response = await loginWithEmailAndPassword(data);
        return response.user;
    },
    registerFn: async (data: RegisterInput) => {
        const response = await registerWithEmailAndPassword(data);
        return response.user;
    },
    logoutFn: async () => {
        await logout();
        setAccessToken(null);
    },
};

export const { useUser, useLogin, useLogout, useRegister, AuthLoader } =
    configureAuth(authConfig);
