import { useEffect, useState } from "react"
import API from '../../api/api'
import { Link } from "react-router-dom";

function user_project() {
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

  useEffect(() => {
    mytask();
  }, [])

  return (
    <div className="min-h-screen bg-stone-100 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-stone-800">My Project</h1>
            <p className="text-gray-500 mt-1">
              Here are all your Project details
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
                      Project Name:
                    </h1>

                    <p className="text-base text-gray-700">
                      {t.projectId?.projectName}
                    </p>
                  </div>

                  <div className="flex gap-1">
                    <h1 className="text font-bold text-stone-800">
                      Description:
                    </h1>

                    <p className="text-base text-gray-700">
                      {t.projectId?.description}
                    </p>
                  </div>

                </div>

                <Link
                  to="/user_task"
                  className="inline-block mt-4 bg-stone-800 text-white px-4 py-2 rounded-lg"
                >
                  View Tasks
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default user_project;