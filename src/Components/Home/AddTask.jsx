import Swal from "sweetalert2";
import useAxiosPublic from "../hooks/useAxiosPublic";


const AddTask = () => {

    const axiosPublic = useAxiosPublic()

    const handleTask = e => {
        e.preventDefault()
        const form = e.target;
        const task = form.task.value;
        const priority = form.priority.value;
        const status = 'Incomplete'
        const tasks = { task, priority,status }
        // console.log(tasks)

        axiosPublic.post("/task", tasks)
            .then(res => {
                // console.log(res.data)
                if(res.data.insertedId){
                    form.reset()
                    Swal.fire(
                        'Congratulations',
                        'Task added Successfully!',
                        'success'
                      )
                }
            })


    }

    return (
        <div>
            
            <div className="hero h-[90vh] mt-10 rounded-xl bg-base-200">
                <div className="hero-content flex-col lg:flex-col ">
                    <div className="text-center  lg:text-left">
                        <h1 className="text-3xl  font-bold">Add Task</h1>
                    </div>
                    <div className="card shrink-0 w-[320px] max-w-sm shadow-2xl  bg-base-100">
                        <form onSubmit={handleTask} className="card-body">
                            <div className="form-control">
                                <label className="form-control">
                                    <div className="label">
                                        <span className="label-text">Write Your Task</span>
                                    </div>
                                    <textarea name="task" className="textarea textarea-bordered h-24 " placeholder="Write Your Task" required></textarea>
                                </label>
                            </div>
                            <div className="form-control">
                                <label className="form-control w-full max-w-xs">
                                    <div className="label">
                                        <span className="label-text">Add Priority</span>

                                    </div>
                                    <select name="priority" className="select select-bordered" required>
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

export default AddTask;