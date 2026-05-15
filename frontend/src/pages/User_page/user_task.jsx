import { useEffect, useState } from "react";
import API from "../../api/api";

function UserTask() {
  const [task, settask] = useState([]);

  async function mytask() {
    try {
      const res = await API.get("/task/mytask");
      console.log("TASK RESPONSE:", res.data);
      settask(res.data.task || []);
    } catch (err) {
      console.log({ message: err.message });
    }
  }

  async function updatestatus(id) {
    try {
      const res = await API.patch(`/task/updatestatus/${id}`, {
        status: "completed",
      });

      alert(res.data.message);
      mytask();
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  }

  useEffect(() => {
    mytask();
  }, []);

  return (
    <div className="min-h-screen bg-stone-100 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-stone-800">My Task</h1>
            <p className="text-gray-500 mt-1">
              Here are all your task details
            </p>
          </div>
        </div>

        {task.length === 0 ? (
          <div className="bg-white rounded-xl shadow p-10 text-center">
            <p className="text-gray-500 text-lg">No task found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {task.map((t) => (
              <div
                key={t._id}
                className="bg-white rounded-2xl shadow p-6 hover:shadow-lg transition"
              >
                <div className="mb-4">
                  <div className="flex items-center gap-1">
                    <h1 className="text font-bold text-stone-800">
                      Task Name:
                    </h1>

                    <p className="text-base text-gray-700">
                      {t.title}
                    </p>
                  </div>

                   <div className="flex items-center gap-1">
                    <h1 className="text font-bold text-stone-800">
                      Project Name:
                    </h1>

                    <p className="text-base text-gray-700">
                      {t.projectId?.projectName}
                    </p>
                  </div>

                   <div className="flex items-center gap-1">
                    <h1 className="text font-bold text-stone-800">
                      Task Status:
                    </h1>

                    <p className="text-base text-gray-700">
                      {t.status}
                    </p>
                  </div>

                   <div className="flex items-center gap-1">
                    <h1 className="text font-bold text-stone-800">
                      Task Priority:
                    </h1>

                    <p className="text-base text-gray-700">
                      {t.priority}
                    </p>
                  </div>

                   <div className="flex items-center gap-1">
                    <h1 className="text font-bold text-stone-800">
                      Deadline:
                    </h1>

                    <p className="text-base text-gray-700">
                      {new Date(t.deadline).toLocaleDateString()}
                    </p>
                  </div>
                  </div>
                  
                <div className="mt-5">
                  {t.status === "completed" ? (
                    <button
                      disabled
                      className="bg-green-500 text-white px-4 py-2 rounded-lg cursor-not-allowed"
                    >
                      Completed
                    </button>
                  ) : (
                    <button
                      onClick={() => updatestatus(t._id)}
                      className="bg-stone-800 hover:bg-stone-700 text-white px-4 py-2 rounded-lg"
                    >
                      Mark Complete
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default UserTask;