import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { GrDocumentUpdate} from "react-icons/gr";
import { FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";


const DisplayTask = () => {

    const axiosPublic = useAxiosPublic()

    const { refetch, isLoading, isError, data: task = [] } = useQuery({
        queryKey: ['tasks'],
        queryFn: async () => {
            const res = await axiosPublic.get('/task')
            return res.data


        }
    })



    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error fetching tasks</div>;


    const handleStatus = id => {
        const completed = { status: 'Completed' };
        axiosPublic.put(`/task/status/${id}`, completed)
            .then(res => {
                console.log(res.data)
                refetch();
            });
    }

    // for complete task length
    const completeLength = task.filter(complete => complete.status == 'Completed')


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



    // for delete
    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {

                axiosPublic.delete(`/task/${id}`)
                    .then(res => {
                        // console.log(data)
                        if (res.data.deletedCount > 0) {
                            refetch()
                            Swal.fire(
                                'Deleted!',
                                'Your file has been deleted.',
                                'success'
                            )

                        }
                    })


            }
        })
    }





    return (
        <div className="flex lg:flex-row flex-col-reverse lg:w-[600px] mx-auto  lg:gap-10">
            <div className="lg:h-[90vh] lg:w-[400px] w-[400px] mx-auto overflow-y-auto overflow-x-hidden mt-10 rounded-xl bg-base-200 ">
                {
                    task.map(task => (<div key={task._id} className={'card mx-auto flex flex-row items-center lg:w-[360px] w-[330px]  border border-pink-500 shadow-2xl  mt-3 mb-3 bg-transparent '}>

                        <div className="card-body items-center text-center">
                            <h2 className="card-title ">{task.task}</h2>
                            <div className="flex gap-4">
                                <p className={`${getPriorityColor(task.priority)} font-bold`}>{task.priority}</p>
                                <p onClick={() => handleStatus(task._id)} className="cursor-pointer  font-bold">{task.status}</p>
                            </div>

                        </div>
                        <div>
                            <ul className="menu  space-y-4 bg-base-200 rounded-box">
                                <li>
                                    <Link to={`updateTask/${task._id}`}><a className="tooltip tooltip-left" data-tip="Update">
                                    <GrDocumentUpdate className="text-xl text-green-600"></GrDocumentUpdate>
                                    </a></Link>
                                </li>
                                <li>
                                    <a onClick={() => { handleDelete(task._id) }} className="tooltip tooltip-left" data-tip="Delete">
                                        <FaTrashAlt className="text-xl  text-red-600"></FaTrashAlt>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>))
                }

            </div>
            <div className="mt-10 mx-auto">
                <h2>Total Task: {task.length}</h2>
                <h2>Complete Task: {completeLength.length}</h2>
            </div>
        </div>
    );
};

export default DisplayTask;