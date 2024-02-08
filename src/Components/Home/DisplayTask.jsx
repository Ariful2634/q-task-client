
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { GrDocumentUpdate } from "react-icons/gr";
import { FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import { useState } from "react";
import { Link } from "react-router-dom";

const DisplayTask = () => {
    const axiosPublic = useAxiosPublic();

    const { refetch, isLoading, isError, data: tasks = [] } = useQuery({
        queryKey: ['tasks'],
        queryFn: async () => {
            const res = await axiosPublic.get('/task');
            return res.data;
        }
    });

    const [priorityFilter, setPriorityFilter] = useState('all');

    const handleStatus = async (id) => {
        const completed = { status: 'Completed' };
        await axiosPublic.put(`/task/status/${id}`, completed);
        refetch();
    };

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        });

        if (result.isConfirmed) {
            await axiosPublic.delete(`/task/${id}`);
            refetch();
            Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
            );
        }
    };

    const getPriorityColor = priority => {
        switch (priority) {
            case 'Low':
                return 'text-red-600';
            case 'Medium':
                return 'text-green-600';
            case 'High':
                return 'text-blue-600';
            default:
                return '';
        }
    };

    // for filter
    const filteredTasks = tasks.filter(task => {
        if (priorityFilter === 'all') return true;
        return task.priority === priorityFilter;
    });

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error fetching tasks</div>;

    return (
        <div className="  lg:h-[90vh] lg:w-[500px] mt-10 bg-base-200 rounded-xl w-[400px] mx-auto lg:gap-5">
            <div>
                <div className="flex justify-center mt-6 mb-4">
                    <button onClick={() => setPriorityFilter('all')} className={`btn ${priorityFilter === 'all' ? 'bg-indigo-500 text-white' : 'bg-gray-300'} mr-2`}>All</button>
                    <button onClick={() => setPriorityFilter('Low')} className={`btn ${priorityFilter === 'Low' ? 'bg-red-500 text-white' : 'bg-gray-300'} mr-2`}>Low</button>
                    <button onClick={() => setPriorityFilter('Medium')} className={`btn ${priorityFilter === 'Medium' ? 'bg-green-500 text-white' : 'bg-gray-300'} mr-2`}>Medium</button>
                    <button onClick={() => setPriorityFilter('High')} className={`btn ${priorityFilter === 'High' ? 'bg-blue-500 text-white' : 'bg-gray-300'} mr-2`}>High</button>
                </div>
                <div className=" mt-4 mb-2 flex justify-evenly mx-auto">
                    <h2 className="font-bold text-blue-600">Total Task: {tasks.length}</h2>
                    <h2 className="font-bold text-green-600">Complete Task: {tasks.filter(task => task.status === 'Completed').length}</h2>
                </div>
            </div>
            <div className=" overflow-y-auto h-[70vh] overflow-x-hidden  rounded-xl ">
                {filteredTasks.map(task => (
                    <div key={task._id} className={'card mx-auto flex flex-row  items-center  lg:w-[400px] w-[330px]  border border-pink-500 shadow-2xl  mt-3 mb-3 bg-transparent '}>
                        <div className="card-body items-center text-center">
                            <h2 className="card-title ">{task.task}</h2>
                            <div className="flex gap-4">
                                <p className={`${getPriorityColor(task.priority)} font-bold`}>{task.priority}</p>
                                <p onClick={() => handleStatus(task._id)} className="cursor-pointer  font-bold">{task.status}</p>
                            </div>
                        </div>
                        <div>
                            <ul className=" menu space-y-4  ">
                                <li>
                                    <Link to={`updateTask/${task._id}`}>
                                        <a className="tooltip tooltip-left" data-tip="Update">
                                            <GrDocumentUpdate className="text-xl text-green-600"></GrDocumentUpdate>
                                        </a>
                                    </Link>
                                </li>
                                <li>
                                    <a onClick={() => handleDelete(task._id)} className="tooltip tooltip-left" data-tip="Delete">
                                        <FaTrashAlt className="text-xl  text-red-600"></FaTrashAlt>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
};

export default DisplayTask;
