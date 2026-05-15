import { useState } from "react";
import API from "../api/api";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [formdata, setformdata] = useState({
    email: "",
    password: "",
  });

  const handlechange = (e) => {
    setformdata({
      ...formdata,
      [e.target.name]: e.target.value,
    });
  };

 const handlesubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await API.post("/auth/login", formdata);

    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data.user));

    alert(res.data.message);

    navigate("/dashboard");
    
  } catch (err) {
    console.log(err.response?.data || err.message);
  }
};

  return (
    <div className="min-h-screen bg-stone-100 flex justify-center items-center p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-stone-800">
            Welcome Back
          </h1>
          <p className="text-gray-500 mt-2">
            Login to your project management account
          </p>
        </div>

        <form onSubmit={handlesubmit} className="space-y-5">
          <div>
            <label className="block mb-2 font-medium text-stone-700">
              Email
            </label>

            <input
              className="w-full border border-stone-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-stone-400"
              type="email"
              placeholder="Enter your email"
              name="email"
              value={formdata.email}
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
              name="password"
              value={formdata.password}
              onChange={handlechange}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-stone-800 text-white py-3 rounded-xl font-semibold hover:bg-stone-700 transition"
          >
            Login
          </button>
        </form>

        <p className="text-center text-gray-500 mt-6">
          Don&apos;t have an account?{" "}
          <Link to="/" className="text-stone-800 font-semibold">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;