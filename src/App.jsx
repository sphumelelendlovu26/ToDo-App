import "./App.css";
import { useState, useEffect } from "react";
import TaskComponent from "./components/TaskComponent";

function App() {
  const [userInput, setUserInput] = useState("");
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    console.log(tasks);
  }, [tasks]);

  function addTasks() {
    const date = new Date();
    const id = Math.floor(date - Math.random() * 1000);
    if (userInput.trim() !== "") {
      setTasks([...tasks, { text: userInput, id: id }]);
    }
  }
  function deleteTask(idToBeDeleted) {
    const tasksAfterDel = tasks.filter((task) => task.id !== idToBeDeleted);
    setTasks(tasksAfterDel);
  }

  return (
    <div className=" bg-zinc-700 text-gray-100    h-screen p-5 ">
      <header className="flex  flex-col  items-center w-full">
        <h1 className="text-center mb-10 font-extrabold text-5xl">
          To Do List
        </h1>
        <div className="h-10  flex justify-between w-full max-w-xl  ">
          <input
            className="outline-indigo-600 border-0 bg-zinc-500 p-4  w-full text-white rounded"
            placeholder="Enter Task"
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
          />
          <button
            className="bg-indigo-600 w-50 hover:text-green-500  hover:bg-indigo-700 rounded transition"
            onClick={() => addTasks()}
          >
            Add Task
          </button>
        </div>
      </header>{" "}
      {tasks.length > 0 && (
        <div className="mt-8 w-full">
          <h3 className="flex  justify-between">
            <span className="border-4 w-auto rounded border-indigo-600 p-1">
              All Tasks
            </span>
            <button
              className="bg-indigo-600 w-50 hover:bg-indigo-700 rounded   hover:text-red-500 transition duration-300"
              onClick={() => setTasks([])}
            >
              clear Tasks
            </button>
          </h3>
          <ul className="p-3 border-2 border-indigo-600 mt rounded-lg ">
            {tasks.map((task) => (
              <li key={task.id}>
                <TaskComponent task={task} deleteTask={deleteTask} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
