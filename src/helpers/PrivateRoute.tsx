import { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';

import { getLoginToken } from 'helpers/getLoginToken';

export const PrivateRoute = ({ children }: { children: ReactElement }) => {
  const loginToken = getLoginToken();

  if (!loginToken) {
    return <Navigate to="/welcome" />;
  }
  return children;
};
