import {Link, useNavigate } from "react-router-dom";

function privatenavbar(){
    const navigate = useNavigate();

    const handlelogout=()=>{
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login")
    }

    return(
           <nav className="bg-stone-800 text-white px-8 py-4 shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center">

        <h1 className="text-2xl font-bold">
          Project Management System
        </h1>

        <div className="flex gap-4 items-center">

          <Link
            to="/dashboard"
            className="hover:bg-stone-700 px-4 py-2 rounded-lg"
          >
            Dashboard
          </Link>

          <Link
            to="/allclient"
            className="hover:bg-stone-700 px-4 py-2 rounded-lg"
          >
            Clients
          </Link>

          <Link
            to="/getproject"
            className="hover:bg-stone-700 px-4 py-2 rounded-lg"
          >
            Projects
          </Link>

          <Link
            to="/alltask"
            className="hover:bg-stone-700 px-4 py-2 rounded-lg"
          >
            Tasks
          </Link>

          <button
            onClick={handlelogout}
            className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg"
          >
            Logout
          </button>

        </div>
      </div>
    </nav>
    )
}

export default privatenavbar;