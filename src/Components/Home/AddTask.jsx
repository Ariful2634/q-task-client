
import Swal from "sweetalert2";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { useQueryClient } from "@tanstack/react-query"; 

const AddTask = () => {
    const axiosPublic = useAxiosPublic();
    const queryClient = useQueryClient(); 

    const handleTask = async (e) => { 
        e.preventDefault();
        const form = e.target;
        const task = form.task.value;
        const priority = form.priority.value;
        const status = "Incomplete";
        const tasks = { task, priority, status };

        try {
            const res = await axiosPublic.post("/task", tasks); 
            if (res.data.insertedId) {
                form.reset();
                
                Swal.fire("Congratulations", "Task added Successfully!", "success");
                
                queryClient.invalidateQueries("tasks");
            }
        } catch (error) {
            console.error("Error adding task:", error);
            
            Swal.fire("Error", "Failed to add task", "error");
        }
    };

    return (
        <div className="lg:w-[600px] mx-auto w-[400px]">
            <div className="hero lg:h-[90vh] w-full mt-10 rounded-xl bg-base-200">
                <div className="hero-content flex-col lg:flex-col ">
                    <div className="text-center  lg:text-left">
                        <h1 className="text-3xl font-bold">Add Task</h1>
                    </div>
                    <div className="card shrink-0 lg:w-[320px] w-[300px] max-w-sm shadow-2xl bg-base-100">
                        <form onSubmit={handleTask} className="card-body">
                            <div className="form-control">
                                <label className="form-control">
                                    <div className="label">
                                        <span className="label-text">Write Your Task</span>
                                    </div>
                                    <textarea
                                        name="task"
                                        className="textarea textarea-bordered h-24 "
                                        placeholder="Write Your Task"
                                        required
                                    ></textarea>
                                </label>
                            </div>
                            <div className="form-control">
                                <label className="form-control w-full max-w-xs">
                                    <div className="label">
                                        <span className="label-text">Add Priority</span>
                                    </div>
                                    <select name="priority" className="select select-bordered" required>
                                        <option disabled selected>
                                            Pick one
                                        </option>
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
