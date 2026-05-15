import { useEffect, useState } from 'react'
import API from '../api/api'
const user = JSON.parse(localStorage.getItem("user"));
import { Link } from "react-router-dom";
import { UserPlus, FolderPlus, ClipboardList } from "lucide-react";


function Userdashboard() {
  const [project, setproject] = useState([]);
  const [task, settask] = useState([])
   const [user, setUser] = useState(null);

  async function myproject() {
    try {
      const res = await API.get('/project/myproject');
      console.log("PROJECT RESPONSE:", res.data);
      setproject(res.data.project || []);
    }
    catch (err) {
      console.log({ message: err.message });
    }
  }

  async function mytask() {
    try {
      const res = await API.get('/task/mytask');
      console.log("TASK RESPONSE:", res.data);
      settask(res.data.task || []);
    }
    catch (err) {
      console.log({ message: err.message })
    }
  }

  useEffect(() => {
    myproject();
    mytask();
    const latestUser = JSON.parse(localStorage.getItem("user"));
    setUser(latestUser);
  }, [])

  const pendingtask = task.filter((t) => t.status === "pending").length;
  const completedtask = task.filter((t) => t.status === "completed").length;

  const uniqueProjects = [
  ...new Set(task.map(t => t.projectId?._id))
];

  return (
  <div className="min-h-screen bg-gradient-to-br from-stone-100 to-stone-200 p-6">
    <div className="max-w-7xl mx-auto">


      <div className="bg-gradient-to-r from-stone-800 to-stone-700 text-white rounded-3xl p-8 shadow-xl mb-8">
        <h1 className="text-3xl md:text-4xl font-bold">
          Welcome {user?.name || user?.role} 👋
        </h1>

        <p className="text-stone-300 mt-3">
          Track your assigned projects and tasks in one place.
        </p>
      </div>


      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <div className="bg-white rounded-2xl p-6 shadow-md border border-stone-200">
          <p className="text-gray-500 text-sm">Total Projects</p>
          <h2 className="text-4xl font-bold text-stone-800 mt-2">
            {uniqueProjects.length}
          </h2>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-md border border-stone-200">
          <p className="text-gray-500 text-sm">Total Tasks</p>
          <h2 className="text-4xl font-bold text-stone-800 mt-2">
            {task.length}
          </h2>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-md border border-yellow-100">
          <p className="text-gray-500 text-sm">Pending Tasks</p>
          <h2 className="text-4xl font-bold text-yellow-600 mt-2">
            {pendingtask}
          </h2>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-md border border-green-100">
          <p className="text-gray-500 text-sm">Completed Tasks</p>
          <h2 className="text-4xl font-bold text-green-600 mt-2">
            {completedtask}
          </h2>
        </div>
      </div>


      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">


        <div className="bg-white rounded-3xl p-7 shadow-lg border border-stone-200">
          <h2 className="text-2xl font-bold text-stone-800 mb-6">
            Quick Actions
          </h2>

          <div className="space-y-4">
            <Link
              to="/user_project"
              className="flex items-center gap-4 bg-stone-100 hover:bg-stone-800 hover:text-white transition-all duration-300 p-5 rounded-2xl group"
            >
              <div className="bg-white text-stone-800 p-3 rounded-xl shadow group-hover:bg-stone-200">
                <FolderPlus size={24} />
              </div>

              <div>
                <h3 className="font-semibold text-lg">View My Projects</h3>
                <p className="text-sm opacity-70">
                  See only projects assigned to you
                </p>
              </div>
            </Link>

            <Link
              to="/user_task"
              className="flex items-center gap-4 bg-stone-100 hover:bg-stone-800 hover:text-white transition-all duration-300 p-5 rounded-2xl group"
            >
              <div className="bg-white text-stone-800 p-3 rounded-xl shadow group-hover:bg-stone-200">
                <ClipboardList size={24} />
              </div>

              <div>
                <h3 className="font-semibold text-lg">View My Tasks</h3>
                <p className="text-sm opacity-70">
                  Check your pending and completed tasks
                </p>
              </div>
            </Link>
          </div>
        </div>


        <div className="bg-white rounded-3xl p-7 shadow-lg border border-stone-200">
          <h2 className="text-2xl font-bold text-stone-800 mb-6">
            Task Summary
          </h2>

          <div className="space-y-5">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-stone-600">Pending</span>
                <span className="font-semibold">{pendingtask}</span>
              </div>
              <div className="w-full bg-stone-200 rounded-full h-3">
                <div
                  className="bg-yellow-500 h-3 rounded-full"
                  style={{
                    width: `${task.length ? (pendingtask / task.length) * 100 : 0}%`,
                  }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <span className="text-stone-600">Completed</span>
                <span className="font-semibold">{completedtask}</span>
              </div>
              <div className="w-full bg-stone-200 rounded-full h-3">
                <div
                  className="bg-green-500 h-3 rounded-full"
                  style={{
                    width: `${task.length ? (completedtask / task.length) * 100 : 0}%`,
                  }}
                ></div>
              </div>
            </div>
          </div>

          <p className="text-sm text-stone-500 mt-6">
            Your dashboard updates automatically based on your assigned work.
          </p>
        </div>

      </div>
    </div>
  </div>
);
}

export default Userdashboard;