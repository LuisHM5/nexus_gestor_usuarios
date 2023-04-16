import { Navigate, Outlet } from "react-router-dom";
import Root from "../routes/root.jsx";

export const ProtectedRoute = ({ isAllowed, redirectTo, children, rutas, usuario }) => {
  if (!isAllowed) {
    return <Navigate to={redirectTo} replace />;
  }

  return children ? (
    children
  ) : (
    <Root rutas={rutas} usuario={usuario}>
      <Outlet />
    </Root>
  );
};
