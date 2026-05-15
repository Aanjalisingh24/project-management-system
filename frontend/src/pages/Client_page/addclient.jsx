import { useState } from "react";
import API from "../../api/api";

function Addclient() {
  const [formdata, setformdata] = useState({
    name: "",
    email: "",
    phone: "",
    companyname: "",
    address: "",
    notes: "",
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
      const res = await API.post("/client/addclient", formdata);

      alert(res.data.message);

      setformdata({
        name: "",
        email: "",
        phone: "",
        companyname: "",
        address: "",
        notes: "",
      });

    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  return (
    <div className="min-h-screen bg-stone-100 flex justify-center items-center p-6">

      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-xl p-8">

        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-stone-800">
            Add New Client
          </h1>

          <p className="text-gray-500 mt-2">
            Fill all client information below
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
              placeholder="Enter client name"
              name="name"
              value={formdata.name}
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
              placeholder="Enter email"
              name="email"
              value={formdata.email}
              onChange={handlechange}
            />
          </div>

          <div>
            <label className="block mb-2 font-medium text-stone-700">
              Phone
            </label>

            <input
              className="w-full border border-stone-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-stone-400"
              type="text"
              placeholder="Enter phone number"
              name="phone"
              value={formdata.phone}
              onChange={handlechange}
            />
          </div>

          <div>
            <label className="block mb-2 font-medium text-stone-700">
              Company Name
            </label>

            <input
              className="w-full border border-stone-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-stone-400"
              type="text"
              placeholder="Enter company name"
              name="companyname"
              value={formdata.companyname}
              onChange={handlechange}
            />
          </div>

          <div>
            <label className="block mb-2 font-medium text-stone-700">
              Address
            </label>

            <input
              className="w-full border border-stone-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-stone-400"
              type="text"
              placeholder="Enter address"
              name="address"
              value={formdata.address}
              onChange={handlechange}
            />
          </div>

          <div>
            <label className="block mb-2 font-medium text-stone-700">
              Notes
            </label>

            <textarea
              className="w-full border border-stone-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-stone-400"
              placeholder="Additional notes..."
              name="notes"
              rows="4"
              value={formdata.notes}
              onChange={handlechange}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-stone-800 text-white py-3 rounded-xl font-semibold hover:bg-stone-700 transition"
          >
            Add Client
          </button>

        </form>
      </div>
    </div>
  );
}

export default Addclient;