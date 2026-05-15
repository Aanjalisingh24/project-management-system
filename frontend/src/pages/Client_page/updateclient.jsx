import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../../api/api";

function UpdateClient() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    companyname: "",
    address: "",
    notes: ""
  });

  const getClientById = async () => {
    try {
      const res = await API.get(`/client/getClientbyId/${id}`);
      setFormData(res.data.ClientdetailsbyId);
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  useEffect(() => {
    getClientById();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.patch(`/client/updateClient/${id}`, formData);
      alert(res.data.message);
      navigate("/allclient");
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  return (
    <div className="min-h-screen bg-stone-100 flex justify-center items-center p-6">

  <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl p-8">

    <div className="mb-8 text-center">
      <h1 className="text-3xl font-bold text-stone-800">
        Update Client
      </h1>

      <p className="text-gray-500 mt-2">
        Edit and update client information
      </p>
    </div>

    <form onSubmit={handleSubmit} className="space-y-5">

      <div>
        <label className="block mb-2 font-medium text-stone-700">
          Client Name
        </label>

        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter client name"
          className="w-full border border-stone-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-stone-500"
        />
      </div>

      <div>
        <label className="block mb-2 font-medium text-stone-700">
          Email
        </label>

        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter email"
          className="w-full border border-stone-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-stone-500"
        />
      </div>

      <div>
        <label className="block mb-2 font-medium text-stone-700">
          Phone
        </label>

        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Enter phone number"
          className="w-full border border-stone-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-stone-500"
        />
      </div>

      <div>
        <label className="block mb-2 font-medium text-stone-700">
          Company Name
        </label>

        <input
          type="text"
          name="companyname"
          value={formData.companyname}
          onChange={handleChange}
          placeholder="Enter company name"
          className="w-full border border-stone-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-stone-500"
        />
      </div>

      <div>
        <label className="block mb-2 font-medium text-stone-700">
          Address
        </label>

        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Enter address"
          className="w-full border border-stone-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-stone-500"
        />
      </div>

      <div>
        <label className="block mb-2 font-medium text-stone-700">
          Notes
        </label>

        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          placeholder="Additional notes..."
          rows="4"
          className="w-full border border-stone-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-stone-500"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-stone-800 text-white py-3 rounded-xl font-semibold hover:bg-stone-700 transition duration-300 shadow-md"
      >
        Update Client
      </button>

    </form>
  </div>
</div>
  );
}

export default UpdateClient;