import { useSelector, useDispatch } from 'react-redux';
import { logout, setAuthenticated, setUser } from '../redux/features/currentSessionSlice';
import type { RootState } from '../redux/store';

type User = {
  id: string;
  username: string;
  role: string;
};

export const useAuth = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.auth);

  const login = async (userData: User) => {
    dispatch(setUser(userData));
    dispatch(setAuthenticated(true));
  };

  const signOut = () => {
    dispatch(logout());
  };

  return {
    ...auth,
    login,
    logout: signOut,
  };
};
