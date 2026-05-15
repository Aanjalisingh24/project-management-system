import { useEffect , useState } from 'react';
import API from '../../api/api'
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


function Allproject(){
    const[project , setproject] = useState([]);
     const navigate = useNavigate();

   async function  getallproject(req,res){
    try{
        const res = await API.get('/project/getproject');
        setproject(res.data.project);
    }
    catch(err){
        res.json({message:err.message})
    }
    }

    
  async function Delete(id) {
    try {
      const res = await API.delete(`/project/Deleteproject/${id}`);
      alert(res.data.message);
      getclients();
    } catch (err) {
      console.log("Error:", err.response?.data || err.message);
    }
  }

    useEffect(()=>{
        getallproject();
    },[])

    return(
        <div className="min-h-screen bg-stone-100 p-6">
      <div className="max-w-6xl mx-auto">

        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-stone-800">
              All Projects
            </h1>
            <p className="text-gray-500 mt-1">
              Manage all your Project details here
            </p>
          </div>

          <button
            onClick={() => navigate("/Addproject")}
            className="bg-stone-800 text-white px-5 py-2 rounded-lg hover:bg-stone-700"
          >
            Add Project
          </button>
        </div>

        {project.length === 0 ? (
          <div className="bg-white rounded-xl shadow p-10 text-center">
            <p className="text-gray-500 text-lg">No Project found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {project.map((project) => (
              <div
                key={project._id}
                className="bg-white rounded-2xl shadow p-6 hover:shadow-lg transition"
              >
                <div className="mb-4">
                  <h3 className="text font-bold text-stone-800">
                    Project name: {project.projectName}
                  </h3>
                </div>

                 <div className="space-y-1 text-gray-700">

                  <p>
                    <span className="font-semibold">ClientName:</span>{" "}
                    {project.clientId?.name}
                  </p>

                    <p>
                    <span className="font-semibold">deadline:</span>{" "}
                    {new Date(project.deadline).toLocaleDateString()}
                  </p>

                  <p>
                    <span className="font-semibold">Project Status:</span>{" "}
                    {project.status || "N/A"}
                  </p>

                </div>

                <div className="flex gap-3 mt-6">
                  <button
                    className="flex-1 bg-stone-800 text-white py-2 rounded-lg hover:bg-stone-700"
                    onClick={() => navigate(`/Updateproject/${project._id}`)}
                  >
                    Edit
                  </button>

                  <button
                    className="flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
                    onClick={() => Delete(project._id)}
                  >
                    Delete
                  </button>
                </div>

                 <Link
                  to="/alltask"
                  className="inline-block mt-4 bg-stone-800 text-white px-2 py-2 rounded-lg"
                >
                  For More Details
                </Link>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
    )
}

export default Allproject;