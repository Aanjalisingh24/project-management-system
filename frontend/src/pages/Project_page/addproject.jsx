import { useEffect, useState } from "react";
import API from "../../api/api";


function Addproject() {
    const [formdata, setformdata] = useState({
        projectName: "",
        description: "",
        clientId: "",
        deadline:""
    });
    const [client, setclient] = useState([])
    const [users, setusers] = useState([]);

    async function getclient() {
        const res = await API.get("/client/getclient");
        setclient(res.data.Clientdetails || []);
    }

    async function getusers() {
        const res = await API.get("/auth/getuser");
        setusers(res.data.user);
    }

    const handlechange = (e) => {
        setformdata({
            ...formdata,
            [e.target.name]: e.target.value,
        });
    };

    const handlesubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await API.post("/project/createproject", formdata);

            alert(res.data.message);

            setformdata({
                projectName: "",
                description: "",
                clientId: "",
                assignedTo: ""
            });

        } catch (err) {
            console.log(err.response?.data || err.message);
        }
    };
    
    useEffect(() => {
        getclient();
        getusers();
    }, [])

    return (
        <div className="min-h-screen bg-stone-100 flex justify-center items-center p-6">

            <div className="bg-white w-full max-w-2xl rounded-2xl shadow-xl p-8">

                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold text-stone-800">
                        Add New Project
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Fill all Project information below
                    </p>
                </div>

                <form onSubmit={handlesubmit} className="space-y-5">

                    <div>
                        <label className="block mb-2 font-medium text-stone-700">
                            ProjectName
                        </label>

                        <input
                            className="w-full border border-stone-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-stone-400"
                            type="text"
                            placeholder="Enter project name"
                            name="projectName"
                            value={formdata.name}
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
                            placeholder="Enter description for project"
                            name="description"
                            value={formdata.description}
                            onChange={handlechange}
                        />
                    </div>

                     <div>
                        <label className="block mb-2 font-medium text-stone-700">
                            deadline
                        </label>

                        <input
                            className="w-full border border-stone-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-stone-400"
                            type="date"
                            placeholder="Enter description for project"
                            name="deadline"
                            value={formdata.deadline}
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
                            onChange={handlechange}
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

                    <button
                        type="submit"
                        className="w-full bg-stone-800 text-white py-3 rounded-xl font-semibold hover:bg-stone-700 transition"
                    >
                        Add Project
                    </button>

                </form>
            </div>
        </div>
    );
}

export default Addproject;