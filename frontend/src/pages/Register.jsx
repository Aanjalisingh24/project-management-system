import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api/api";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setformData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  const handlechange = (e) => {
    setformData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlesubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/signup", formData);

      alert(res.data.message);
      navigate("/login");
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  return (
    <div className="min-h-screen bg-stone-100 flex justify-center items-center p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-stone-800">
            Create Account
          </h1>
          <p className="text-gray-500 mt-2">
            Register to manage your projects
          </p>
        </div>

        <form onSubmit={handlesubmit} className="space-y-5">
          <div>
            <label className="block mb-2 font-medium text-stone-700">
              Name
            </label>

            <input
              className="w-full border border-stone-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-stone-400"
              type="text"
              placeholder="Enter your name"
              value={formData.name}
              name="name"
              onChange={handlechange}
            />
          </div>

          <div>
            <label className="block mb-2 font-medium text-stone-700">
              Email
            </label>

            <input
              className="w-full border border-stone-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-stone-400"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              name="email"
              onChange={handlechange}
            />
          </div>

          <div>
            <label className="block mb-2 font-medium text-stone-700">
              Password
            </label>

            <input
              className="w-full border border-stone-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-stone-400"
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              name="password"
              onChange={handlechange}
            />
          </div>

          <div>
            <label className="block mb-2 font-medium text-stone-700">
              Role
            </label>

            <select
              className="w-full border border-stone-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-stone-400"
              name="role"
              value={formData.role}
              onChange={handlechange}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <button
            className="w-full bg-stone-800 text-white py-3 rounded-xl font-semibold hover:bg-stone-700 transition"
            type="submit"
          >
            Register
          </button>
        </form>

        <p className="text-center text-gray-500 mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-stone-800 font-semibold">
            Login
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Register;