import AddTask from "./AddTask";
import DisplayTask from "./DisplayTask";


const Home = () => {
    return (
        <div className="grid grid-cols-3 gap-5">
            <AddTask></AddTask>
            <DisplayTask></DisplayTask>
        </div>
    );
};

export default Home;