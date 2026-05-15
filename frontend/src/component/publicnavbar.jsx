import { Link } from "react-router-dom";

function PublicNavbar() {
  return (
    <nav className="bg-stone-800 text-white px-8 py-4 shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center">

        <h1 className="text-2xl font-bold">
          Project Management System
        </h1>

        <div className="flex gap-4">
          <Link
            to="/login"
            className="hover:bg-stone-700 px-4 py-2 rounded-lg"
          >
            Login
          </Link>

          <Link
            to="/"
            className="bg-white text-stone-800 px-4 py-2 rounded-lg font-semibold"
          >
            Register
          </Link>
        </div>

      </div>
    </nav>
  );
}

export default PublicNavbar;