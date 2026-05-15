import { useEffect, useState } from "react";
import API from '../../api/api'
import { useNavigate } from "react-router-dom";

function alltask(){
    const[task , settask] = useState([]);
     const navigate = useNavigate();

    async function gettask(){
        try{
            const res = await API.get('/task/gettask');
            settask(res.data.task);
        }
        catch(err){
            console.log(err.message);
        }
    }

      async function Delete(id) {
    try {
      const res = await API.delete(`/task/Delete/${id}`);
      alert(res.data.message);
      gettask();
    } catch (err) {
      console.log("Error:", err.response?.data || err.message);
    }
  }

    useEffect(()=>{
        gettask();
    },[])

    return(
         <div className="min-h-screen bg-stone-100 p-6">
      <div className="max-w-6xl mx-auto">

        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-stone-800">
              All Tasks
            </h1>
            <p className="text-gray-500 mt-1">
              Manage all your Tasks details here
            </p>
          </div>

          <button
            onClick={() => navigate("/addtask")}
            className="bg-stone-800 text-white px-5 py-2 rounded-lg hover:bg-stone-700"
          >
            Add Tasks
          </button>
        </div>

        {task.length === 0 ? (
          <div className="bg-white rounded-xl shadow p-10 text-center">
            <p className="text-gray-500 text-lg">No Task found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {task.map((task) => (
              <div
                key={task._id}
                className="bg-white rounded-2xl shadow p-6 hover:shadow-lg transition"
              >
                <div className="mb-4">
                  <h3 className="text font-bold text-stone-800">
                    Task name: {task.title}
                  </h3>
                  <p className="text-sm text-gray-500">
                    Task status: {task.status}
                  </p>
                </div>

                 <div className="space-y-2 text-gray-700">
                  <p>
                    <span className="font-semibold">ProjectName:</span>{" "}
                    {task.projectId?.projectName}
                  </p>

                  <p>
                    <span className="font-semibold">ClientName:</span>{" "}
                    {task.clientId?.name}
                  </p>

                    <p>
                    <span className="font-semibold">Assign Task:</span>{" "}
                    {task.assignedTo?.name}
                  </p>

                  <p>
                    <span className="font-semibold">deadline:</span>{" "}
                    {new Date(task.deadline).toLocaleDateString()}
                  </p>
                </div>


                <div className="flex gap-3 mt-6">
                  <button
                    className="flex-1 bg-stone-800 text-white py-2 rounded-lg hover:bg-stone-700"
                    onClick={() => navigate(`/Updatetask/${task._id}`)}
                  >
                    Edit
                  </button>

                  <button
                    className="flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
                    onClick={() => Delete(task._id)}
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
    )
}

export default alltask;