import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../../api/api";

function Updateproject() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        projectName: "",
        description: "",
        clientId: "",
        status: "",
        deadline: ""
    });

     const [client, setclient] = useState([])

    async function getclient() {
        const res = await API.get("/client/getclient");
        setclient(res.data.Clientdetails || []);
    }

 const getprojectById = async () => {
  try {
    const res = await API.get(`/project/getprojectbyid/${id}`);

    console.log("PROJECT RESPONSE:", res.data);

    setFormData({
      projectName: res.data.projectName || "",
      description: res.data.description || "",
      clientId: res.data.clientId?._id || res.data.clientId || "",
      status: res.data.status || "",
      deadline: res.data.deadline?.slice(0, 10) || "",
    });

  } catch (err) {
    console.log(err.response?.data || err.message);
  }
};

    useEffect(() => {
        getprojectById();
        getclient()
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
            const res = await API.patch(`/project/updateproject/${id}`, formData);
            alert(res.data.message);
            navigate("/getproject");
        } catch (err) {
            console.log(err.response?.data || err.message);
        }
    };

    return (
        <div className="min-h-screen bg-stone-100 flex justify-center items-center p-6">

            <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl p-8">

                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold text-stone-800">
                        Update Project
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Edit and update Project information
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">

                    <div>
                        <label className="block mb-2 font-medium text-stone-700">
                            Project Name
                        </label>

                        <input
                            type="text"
                            name="projectName"
                            value={formData.projectName}
                            onChange={handleChange}
                            placeholder="Enter project name"
                            className="w-full border border-stone-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-stone-500"
                        />
                    </div>
                    <div>
                        <label className="block mb-2 font-medium text-stone-700">
                            description
                        </label>

                        <input
                            type="text"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Enter description"
                            className="w-full border border-stone-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-stone-500"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Select Client
                        </label>

                        <select
                            name="clientId"
                            value={formData.clientId}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-stone-500 focus:border-stone-500 shadow-sm"
                        >
                            <option value="">Choose a client</option>

                            {client.map((client) => (
                                <option key={client._id} value={client._id}>
                                    {client.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>

                         <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Select Status
                        </label>

                        <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        className="w-full border border-stone-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-stone-500"
                    >
                        <option value="">Select status</option>
                        <option value="pending">Pending</option>
                        <option value="in-progress">In Progress</option>
                        <option value="completed">Completed</option>
                    </select>

                    </div>


                    <div>
                        <label className="block mb-2 font-medium text-stone-700">
                            deadline
                        </label>

                        <input
                            type="date"
                            name="deadline"
                            value={formData.deadline}
                            onChange={handleChange}
                            placeholder="project deadline"
                            className="w-full border border-stone-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-stone-500"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-stone-800 text-white py-3 rounded-xl font-semibold hover:bg-stone-700 transition duration-300 shadow-md"
                    >
                        Update project
                    </button>

                </form>
            </div>
        </div>
    );
}

export default Updateproject;