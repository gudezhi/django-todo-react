// useAuth.js

import { useContext } from 'react';
import { AuthContext } from './AuthContext';

const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  const { authToken, login, logout } = context;

  return { authToken, login, logout };
};

export default useAuth;
