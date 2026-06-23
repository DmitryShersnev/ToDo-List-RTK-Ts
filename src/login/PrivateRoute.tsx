import { Outlet, Navigate } from "react-router";

const PrivateRoute = () => {
  const token: string | null = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/reglog" replace />;
  }
  return <Outlet />;
};
export default PrivateRoute;
