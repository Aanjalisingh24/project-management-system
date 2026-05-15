import { useEffect, useState } from "react";
import API from "../../api/api";

function addtask() {
    const [client, setclient] = useState([]);
    const [project, setproject] = useState([]);
     const [users, setusers] = useState([]);
    const [formdata, setformdata] = useState({
        title: "",
        description: "",
        projectId: "",
        clientId: "",
        assignedTo:"",
        status: "",
        priority: "",
        deadline: "",
    });

    const handlechange = (e) => {
        setformdata({
            ...formdata,
            [e.target.name]: e.target.value
        })
    }

    async function handlesubmit(e) {
         e.preventDefault();
        try {
            const res = await API.post('/task/addtask', formdata);
            alert(res.data.message)

            setformdata({
                title: "",
                description: "",
                projectId: "",
                clientId: "",
                assignedTo:"",
                status: "",
                priority: "",
                deadline: "",
            })
        }
        catch (err) {
            alert(err.response.data.message)
        }
    }

    async function getproject() {
        const res = await API.get("/project/getproject");
        setproject(res.data.project || []);
    }

    async function getclients() {
        const res = await API.get("/client/getClient");
        setclient(res.data.Clientdetails || []);
    }
    
    async function getusers() {
        const res = await API.get("/auth/getuser");
        setusers(res.data.user);
    }

     const handleClientChange = async (e) => {
   const clientId = e.target.value;

   setformdata({
      ...formdata,
      clientId,
   });

   const res = await API.get(
      `/project/getprojectbyclient/${clientId}`
   );

   setproject(res.data.project);
};

    useEffect(() => {
        getproject();
        getclients();
        getusers();
    },[]);

    return (
        <div className="min-h-screen bg-stone-100 flex justify-center items-center p-6">

            <div className="bg-white w-full max-w-2xl rounded-2xl shadow-xl p-8">

                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold text-stone-800">
                        Add New Task
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Fill all Task information below
                    </p>
                </div>

                <form onSubmit={handlesubmit} className="space-y-5">

                    <div>
                        <label className="block mb-2 font-medium text-stone-700">
                            TaskName
                        </label>

                        <input
                            className="w-full border border-stone-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-stone-400"
                            type="text"
                            placeholder="Enter Task name"
                            name="title"
                            value={formdata.title}
                            onChange={handlechange}
                        />
                    </div>

                    <div>
                        <label className="block mb-2 font-medium text-stone-700">
                            description
                        </label>

                        <input
                            className="w-full border border-stone-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-stone-400"
                            type="text"
                            placeholder="Enter description for the Task"
                            name="description"
                            value={formdata.description}
                            onChange={handlechange}
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Select Client
                        </label>

                        <select
                            name="clientId"
                            value={formdata.clientId}
                            onChange={handleClientChange}
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

                    <div className="mb-4">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Select Project
                        </label>

                        <select
                            name="projectId"
                            value={formdata.projectId}
                            onChange={handlechange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-stone-500 focus:border-stone-500 shadow-sm"
                        >
                            <option value="">Choose a Project</option>

                            {project.map((project) => (
                                <option key={project._id} value={project._id}>
                                    {project.projectName}
                                </option>
                            ))}
                        </select>
                    </div>

                     <div className="mb-4">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Select Project
                        </label>

                    <select
                        name="assignedTo"
                        value={formdata.assignedTo}
                        onChange={handlechange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-stone-500 focus:border-stone-500 shadow-sm"
                    >
                        <option value="">Select User</option>

                        {users.map((u) => (
                            <option key={u._id} value={u._id}>
                                {u.name}
                            </option>
                        ))}
                    </select>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label>Deadline</label>

                        <input
                            type="date"
                            name="deadline"
                            value={formdata.deadline}
                            onChange={handlechange}
                        
                            className="border p-2 rounded"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-stone-800 text-white py-3 rounded-xl font-semibold hover:bg-stone-700 transition"
                    >
                        Add Task
                    </button>

                </form>
            </div>
        </div>
    );
}

export default addtask;