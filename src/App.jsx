import "./App.css";
import { useState, useEffect } from "react";
import TaskComponent from "./components/TaskComponent";

function App() {
  const [userInput, setUserInput] = useState("");
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    document.querySelector("input")?.focus();
  }, []);

  useEffect(() => {
    console.log(tasks);
  }, [tasks]);

  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      const parsedTasks = JSON.parse(savedTasks).map((task) => ({
        ...task,
        deleting: false,
      }));
      setTasks(parsedTasks);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  function addTasks() {
    const date = new Date();
    const id = Math.floor(date - Math.random() * 1000);
    if (userInput.trim() !== "") {
      setTasks([...tasks, { text: userInput, id: id }]);
      userInput("");
    }
  }
  function deleteTask(idToBeDeleted) {
    const tasksAfterDel = tasks.map((task) =>
      task.id === idToBeDeleted ? { ...task, deleting: true } : task
    );
    setTasks(tasksAfterDel);

    setTimeout(() => {
      setTasks((prev) => prev.filter((task) => task.id !== idToBeDeleted));
    }, 300);
  }
  function clearTasks() {
    const tasksMarked = tasks.map((task) => ({ ...task, deleting: true }));
    setTasks(tasksMarked);
    setTimeout(() => {
      setTasks([]);
    }, 300);
  }

  return (
    <div className="slide-in-right bg-zinc-700 text-gray-100 overflow-x-hidden   h-screen p-5 ">
      <header className="static flex  flex-col  items-center w-full px-4">
        <h1 className="text-4xl font-bold mb-4 text-white">
          What’s on your mind today?
        </h1>
        <p className="text-lg mb-6 text-white-700 italic">
          Every idea starts with a single task.
        </p>
        <div className="flex space-x-2"></div>
        <div className="flex md:flex-row flex-col flex-grow gap-2 w-full max-w-xl  ">
          <input
            className="outline-indigo-600 border-none bg-zinc-500 p-4  w-full text-white rounded"
            placeholder="Enter Task"
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                addTasks();
              }
            }}
          />
          <button
            className="bg-indigo-600 w-full sm:w-auto hover:text-green-500  hover:bg-indigo-700 rounded transition"
            onClick={() => addTasks()}
          >
            Add Task
          </button>
        </div>
      </header>{" "}
      {tasks.length > 0 && (
        <div className="slide-in-right mt-8 w-full max-w-2xl mx-auto">
          <h3 className="flex  justify-between">
            <span className="border-4 w-auto rounded border-indigo-600 p-1">
              All Tasks
            </span>
            <button
              className="bg-indigo-600 w-50 hover:bg-indigo-700 rounded   hover:text-red-500 transition duration-300"
              onClick={() => clearTasks()}
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
