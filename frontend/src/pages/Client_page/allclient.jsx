import { useNavigate } from "react-router-dom";
import API from "../../api/api";
import { useState, useEffect } from "react";

const Client = () => {
  const [clients, setclients] = useState([]);
  const navigate = useNavigate();

  async function getclients() {
    try {
      const res = await API.get("/client/getClient");
      setclients(res.data.Clientdetails || []);
    } catch (err) {
      console.log("ERROR DATA:", err.response?.data);
    }
  }

  async function Delete(id) {
    try {
      const res = await API.delete(`/client/deleteClient/${id}`);
      alert(res.data.message);
      getclients();
    } catch (err) {
      console.log("Error:", err.response?.data || err.message);
    }
  }

  useEffect(() => {
    getclients();
  }, []);

  return (
    <div className="min-h-screen bg-stone-100 p-6">
      <div className="max-w-6xl mx-auto">

        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-stone-800">
              All Clients
            </h1>
            <p className="text-gray-500 mt-1">
              Manage all your client details here
            </p>
          </div>

          <button
            onClick={() => navigate("/Addclient")}
            className="bg-stone-800 text-white px-5 py-2 rounded-lg hover:bg-stone-700"
          >
            Add Client
          </button>
        </div>

        {clients.length === 0 ? (
          <div className="bg-white rounded-xl shadow p-10 text-center">
            <p className="text-gray-500 text-lg">No clients found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {clients.map((client) => (
              <div
                key={client._id}
                className="bg-white rounded-2xl shadow p-6 hover:shadow-lg transition"
              >
                <div className="mb-4">
                  <h3 className="text font-bold text-stone-800">
                    Client name: {client.name}
                  </h3>
                  <p className="text- text-gray-500">
                    Company name: {client.companyname}
                  </p>
                </div>

                <div className="space-y-1 text-gray-700">
                  <p>
                    <span className="font-semibold">Email:</span>{" "}
                    {client.email}
                  </p>

                  <p>
                    <span className="font-semibold">Phone:</span>{" "}
                    {client.phone}
                  </p>

                  <p>
                    <span className="font-semibold">Address:</span>{" "}
                    {client.address || "N/A"}
                  </p>
                </div>

                <div className="flex gap-3 mt-6">
                  <button
                    className="flex-1 bg-stone-800 text-white py-2 rounded-lg hover:bg-stone-700"
                    onClick={() => navigate(`/UpdateClient/${client._id}`)}
                  >
                    Edit
                  </button>

                  <button
                    className="flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
                    onClick={() => Delete(client._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default Client;