import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { GrDocumentUpdate } from "react-icons/gr";
import { FaTrashAlt } from "react-icons/fa";


const DisplayTask = () => {

    const axiosPublic = useAxiosPublic()

    const { isLoading, isError, data: task = [] } = useQuery({
        queryKey: ['tasks'],
        queryFn: async () => {
            const res = await axiosPublic.get('/task')
            return res.data


        }


    })

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error fetching tasks</div>;

    return (
        <div className="h-[90vh] w-[400px] overflow-y-auto overflow-x-hidden mt-10 rounded-xl bg-base-200 mx-auto">
            {
                task.map(task => (<div key={task._id} className="card mx-auto flex flex-row items-center w-[350px] border border-pink-500 shadow-2xl  mt-3 mb-3 bg-transparent ">

                    <div className="card-body items-center text-center">
                        <h2 className="card-title">{task.task}</h2>
                        <div className="flex gap-4">
                            <p>{task.priority}</p>
                            <p className="cursor-pointer">{task.status}</p>
                        </div>
                        {/* <div className="card-actions justify-center">
                                <button onClick={() => { handleDelete(task._id) }} className="btn bg-gradient-to-r from-pink-500 to-yellow-500 text-white  border-none font-bold "><FaTrash></FaTrash>Delete</button>
                                <Link to={`/dashboard/taskUpdate/${task._id}`}><button className="btn bg-gradient-to-r from-indigo-500 to-purple-500  border-none font-bold text-white"><GrDocumentUpdate></GrDocumentUpdate>Update</button></Link>
                            </div> */}
                        
                    </div>
                    <div>
                    <ul className="menu  space-y-4 bg-base-200 rounded-box">
                            <li>
                                <a className="tooltip tooltip-left" data-tip="Update">
                                    <GrDocumentUpdate className="text-xl text-green-600"></GrDocumentUpdate>
                                </a>
                            </li>
                            <li>
                                <a className="tooltip tooltip-left" data-tip="Delete">
                                   <FaTrashAlt className="text-xl text-red-600"></FaTrashAlt>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>))
            }
        </div>
    );
};

export default DisplayTask;