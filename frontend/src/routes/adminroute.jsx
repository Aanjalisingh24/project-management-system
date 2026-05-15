import { Navigate } from "react-router-dom";

function AdminRoute({ children }) {

  const user = JSON.parse(localStorage.getItem("user"));

  if (user?.role !== "admin") {
    return <Navigate to="/userdashboard" />;
  }

  return children;
}

export default AdminRoute;