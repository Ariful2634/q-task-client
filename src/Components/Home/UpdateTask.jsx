import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import useAxiosPublic from "../hooks/useAxiosPublic";
import Swal from "sweetalert2";


const UpdateTask = () => {

    const navigate = useNavigate()
    const data = useLoaderData()
    const {id}=useParams()
    // console.log(data,id)

    const axiosPublic = useAxiosPublic()

    const updateTask = data.find(task=>task._id==id)
    // console.log(updateTask)
    const {_id}=updateTask


    const handleUpdate = e => {
        e.preventDefault()
        const form = e.target;
        const task = form.task.value;
        const priority = form.priority.value;
        const tasks = { task, priority }
        // console.log(tasks)

        axiosPublic.put(`/update/${_id}`, tasks)
            .then(res => {
                // console.log(res.data)
                if(res.data.modifiedCount > 0){
                    Swal.fire(
                        'Congratulations',
                        'Task updated Successfully!',
                        'success'
                      )
                }
                navigate('/')
            })
           
    }


    return (
        <div>
             <div className="hero lg:h-[90vh] w-full   mt-10 rounded-xl bg-base-200">
                <div className="hero-content flex-col lg:flex-col ">
                    <div className="text-center  lg:text-left">
                        <h1 className="text-3xl  font-bold">Update Task</h1>
                    </div>
                    <div className="card shrink-0 lg:w-[320px] w-[300px] max-w-sm shadow-2xl  bg-base-100">
                        <form onSubmit={handleUpdate} className="card-body">
                            <div className="form-control">
                                <label className="form-control">
                                    <div className="label">
                                        <span className="label-text">Write Your Task</span>
                                    </div>
                                    <textarea defaultValue={updateTask.task} name="task" className="textarea textarea-bordered h-24 " placeholder="Write Your Task" required></textarea>
                                </label>
                            </div>
                            <div className="form-control">
                                <label className="form-control w-full max-w-xs">
                                    <div className="label">
                                        <span className="label-text">Add Priority</span>

                                    </div>
                                    <select name="priority" className="select select-bordered" defaultValue={updateTask.priority} required>
                                        <option disabled selected>Pick one</option>
                                        <option>Low</option>
                                        <option>Medium</option>
                                        <option>High</option>
                                    </select>
                                </label>

                            </div>
                            <div className="form-control mt-6">
                                <button className="btn bg-purple-600 text-white">Add Task</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateTask;