const user = JSON.parse(localStorage.getItem("user"));
import API from "../api/api";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserPlus, FolderPlus, ClipboardList } from "lucide-react";

function Dashboard() {
  const [clients, setclients] = useState([]);
  const [task, settask] = useState([]);
  const [project, setproject] = useState([]);
  const [recentclient, setrecentclient] = useState([]);
   const [user, setUser] = useState(null);

  async function getclients() {
    const res = await API.get("/client/getClient");
    setclients(res.data.Clientdetails || []);
  }

 async function gettask(){
        try{
            const res = await API.get('/task/gettask');
            console.log(task)
            settask(res.data.task);
        }
        catch(err){
            console.log(err.message);
        }
    }

  async function getproject() {
    const res = await API.get("/project/getproject");
    setproject(res.data.project || []);
  }

  async function getrecentclient() {
    const res = await API.get("/client/getrecentclient");
    setrecentclient(res.data.recentclient || []);
  }

  useEffect(() => {
    getclients();
    gettask();
    getproject();
    getrecentclient();
    const latestUser = JSON.parse(localStorage.getItem("user"));
    setUser(latestUser);
  }, []);

  const pendingtask = task.filter((t) => t.status === "pending").length;
  const completedtask = task.filter((t) => t.status === "completed").length;

  return (
    <div className="min-h-screen bg-stone-100 p-6">
      <div className="max-w-6xl mx-auto">

        <div className="bg-stone-700 text-white rounded-2xl p-8 shadow-lg mb-8">
          <h1 className="text-3xl font-bold">
            Welcome {user?.role} 👋
          </h1>
          <p className="text-stone-200 mt-2">
            Here is your project management overview
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5 mb-8">
          <div className="bg-white rounded-xl p-5 shadow">
            <p className="text-gray-500">Total Clients</p>
            <h2 className="text-3xl font-bold text-stone-700">{clients.length}</h2>
          </div>

          <div className="bg-white rounded-xl p-5 shadow">
            <p className="text-gray-500">Total Projects</p>
            <h2 className="text-3xl font-bold text-stone-700">{project.length}</h2>
          </div>

          <div className="bg-white rounded-xl p-5 shadow">
            <p className="text-gray-500">Total Tasks</p>
            <h2 className="text-3xl font-bold text-stone-700">{task.length}</h2>
          </div>

          <div className="bg-white rounded-xl p-5 shadow">
            <p className="text-gray-500">Pending Tasks</p>
            <h2 className="text-3xl font-bold text-yellow-600">{pendingtask}</h2>
          </div>

          <div className="bg-white rounded-xl p-5 shadow">
            <p className="text-gray-500">Completed Tasks</p>
            <h2 className="text-3xl font-bold text-green-600">{completedtask}</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <div className="bg-white rounded-2xl p-6 shadow">
            <h2 className="text-xl font-bold text-stone-700 mb-4">
              Recent Clients
            </h2>

            {recentclient.length === 0 ? (
              <p className="text-gray-500">No recent clients found.</p>
            ) : (
              recentclient.map((client) => (
                <div
                  key={client._id}
                  className="border-b py-3 flex justify-between items-center"
                >
                  <div>
                    <h3 className="font-semibold text-gray-800">
                      {client.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {client.email}
                    </p>
                  </div>
                  <span className="text-xs bg-stone-200 text-stone-700 px-3 py-1 rounded-full">
                    Client
                  </span>
                </div>
              ))
            )}
          </div>


<div className="bg-white rounded-3xl p-7 shadow-lg border border-stone-200">
  
  <h2 className="text-2xl font-bold text-stone-800 mb-6">
    Quick Actions
  </h2>

  <div className="flex flex-col gap-4">

    <Link
      to="/Addclient"
      className="flex items-center gap-4 bg-stone-100 hover:bg-stone-700 hover:text-white transition-all duration-300 p-4 rounded-2xl group"
    >
      <div className="bg-white p-3 rounded-xl shadow group-hover:bg-stone-200">
        <UserPlus size={22} />
      </div>

      <div>
        <h3 className="font-semibold text-lg">Add Client</h3>
        <p className="text-sm opacity-70">
          Create and manage clients
        </p>
      </div>
    </Link>

    <Link
      to="/addproject"
      className="flex items-center gap-4 bg-stone-100 hover:bg-stone-700 hover:text-white transition-all duration-300 p-4 rounded-2xl group"
    >
      <div className="bg-white p-3 rounded-xl shadow group-hover:bg-stone-200">
        <FolderPlus size={22} />
      </div>

      <div>
        <h3 className="font-semibold text-lg">Add Project</h3>
        <p className="text-sm opacity-70">
          Create new projects
        </p>
      </div>
    </Link>

    <Link
      to="/Addtask"
      className="flex items-center gap-4 bg-stone-100 hover:bg-stone-700 hover:text-white transition-all duration-300 p-4 rounded-2xl group"
    >
      <div className="bg-white p-3 rounded-xl shadow group-hover:bg-stone-200">
        <ClipboardList size={22} />
      </div>

      <div>
        <h3 className="font-semibold text-lg">Assign Task</h3>
        <p className="text-sm opacity-70">
          Assign work to team members
        </p>
      </div>
    </Link>

  </div>
</div>

        </div>
      </div>
    </div>
  );
}

export default Dashboard;