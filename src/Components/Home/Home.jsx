import AddTask from "./AddTask";
import DisplayTask from "./DisplayTask";


const Home = () => {
    return (
        <div className="grid lg:grid-cols-2 grid-cols-1 lg:gap-20">
            <AddTask></AddTask>
            <DisplayTask></DisplayTask>
        </div>
    );
};

export default Home;