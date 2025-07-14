import { useCallback, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout, setAuthenticated, setUser } from '../redux/features/currentSessionSlice';
import type { RootState } from '../redux/store';

type User = {
  id: string;
  name: string;
  role: string;
};

export const useAuth = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);

  const login = useCallback(
    (userData: User) => {
      dispatch(setUser(userData));
      dispatch(setAuthenticated(true));
    },
    [dispatch],
  );

  const logoutUser = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  return useMemo(
    () => ({
      isAuthenticated,
      user,
      login,
      logout: logoutUser,
      isAuthReady: user !== null, // dùng nếu cần biết đã check xong
    }),
    [isAuthenticated, user, login, logoutUser],
  );
};
