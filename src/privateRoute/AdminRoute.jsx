import useAuth from '../customHook/useAuth';
import { Navigate, useLocation } from 'react-router-dom';
import useUser from '../customHook/useUser';

const AdminRoute = ({ children }) => {
  const [isAdmin, isAdminLoading] = useUser();
  const { user, loading } = useAuth();
  const location = useLocation();
console.log('Admin Route :',isAdmin,isAdminLoading,loading)
  if (loading || isAdminLoading) {
    return (
      <div className="flex justify-center mt-80">
        <span className="loading loading-bars loading-lg"></span>
      </div>
    );
  }

  if (user && isAdmin) {
    return children;
  }

  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default AdminRoute;
