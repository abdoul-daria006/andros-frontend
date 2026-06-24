import { Navigate } from "react-router-dom";

function ProtectedRoute({
  children
}) {

  const isLoggedIn =
    localStorage.getItem(
      "adminLogged"
    ) === "true";

  return isLoggedIn
    ? children
    : <Navigate to="/admin/login" />;
}

export default ProtectedRoute;