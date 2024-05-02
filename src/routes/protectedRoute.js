import { Navigate } from 'react-router-dom';
import config from '~/config';
import { getLocalStorageItem } from '~/utils/localStorage';

const ProtectedRoute = ({ children }) => {
  const user = getLocalStorageItem('user');
  const role = user?.role;
//   console.log(role);
//   console.log(['admin', 'shop'].includes(role));
  if (!user || !['admin', 'shop'].includes(role)) {
    return <Navigate to={config.routes.forbidden} />;
  }

  return children;
};

export default ProtectedRoute;
