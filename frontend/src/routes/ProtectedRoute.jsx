import { Navigate ,useNavigate } from "react-router-dom";
import login from "../pages/Login";
import Dashboard from "../pages/dashboard";
import userdashboard from "../pages/userdashboard"
const user = JSON.parse(localStorage.getItem("user"));

function ProtectedRoute({ children }) {
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    if (!token) {
        return <Navigate to="/login" />
    }

    return children;
}

export default ProtectedRoute;
