import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../../api/api";

function Updatetask() {
    const { id } = useParams();
    const navigate = useNavigate();
     const [project, setproject] = useState([])
       const [client, setclient] = useState([])

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        projectId: "",
        clientId: "",
        status: "",
        priority: "",
        deadline: "",
    });


    async function getclient() {
        const res = await API.get("/client/getclient");
        setclient(res.data.Clientdetails || []);
    }

    async function getproject() {
    const res = await API.get("/project/getproject");
    setproject(res.data.project || []);
  }

 const gettaskbyid = async () => {
  try {
    const res = await API.get(`/task/gettaskbyid/${id}`);

    console.log("PROJECT RESPONSE:", res.data);

    setFormData({
        title: res.data.title || "",
        description: res.data.description || "",
        projectId: res.data.projectId?._id || res.data.projectId || "",
        clientId: res.data.clientId?._id || res.data.clientId || "",
        status: res.data.status || "",
        deadline: res.data.deadline?.slice(0, 10) || "",
        priority: res.data.priority || "",
    });

  } catch (err) {
    console.log(err.response?.data || err.message);
  }
};

    useEffect(() => {
        gettaskbyid();
        getclient();
        getproject();
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
            const res = await API.patch(`/task/updatetask/${id}`, formData);
            console.log("PROJECT RESPONSE:", res.data);
            alert(res.data.message);
            navigate("/alltask");
        } catch (err) {
            console.log(err.response?.data || err.message);
        }
    };

    return (
        <div className="min-h-screen bg-stone-100 flex justify-center items-center p-6">

            <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl p-8">

                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold text-stone-800">
                        Update Task
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Edit and update Task information
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">

                    <div>
                        <label className="block mb-2 font-medium text-stone-700">
                            Task Name
                        </label>

                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="Enter Task name"
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

                        <div className="mb-4">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Select Project
                        </label>

                        <select
                            name="projectId"
                            value={formData.projectId}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-stone-500 focus:border-stone-500 shadow-sm"
                        >
                            <option value="">Choose a project</option>

                            {project.map((project) => (
                                <option key={project._id} value={project._id}>
                                    {project.projectName}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div></div>

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

                     <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Select priority
                        </label>

                        <select
                        name="priority"
                        value={formData.priority}
                        onChange={handleChange}
                        className="w-full border border-stone-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-stone-500"
                    >
                        <option value="">Select priority</option>
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>



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
                        Update Task
                    </button>

                </form>
            </div>
        </div>
    );
}

export default Updatetask;