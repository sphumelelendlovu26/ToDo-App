import "./App.css";
import { useState, useEffect } from "react";
import TaskComponent from "./components/TaskComponent";
import { FaFilter } from "react-icons/fa";

function App() {
  const [userInput, setUserInput] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editText, setEditText] = useState("");
  const [favFilter, setFavFilter] = useState("All");

  useEffect(() => {
    document.querySelector("input")?.focus();
  }, []);

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
      setTasks([
        ...tasks,
        { text: userInput, id: id, isFavorite: false, isEditing: false },
      ]);
      setUserInput("");
    }
  }

  function toggleFavorite(favoriteId) {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === favoriteId
          ? { ...task, isFavorite: !task.isFavorite }
          : task
      )
    );
  }
  function toggleTaskEditing(idToEdit) {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === idToEdit ? { ...task, isEditing: !task.isEditing } : task
      )
    );
    const taskToEdit = tasks.find((task) => task.id === idToEdit);
    if (taskToEdit) setEditText(taskToEdit.text);
  }
  function saveEdit(id) {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, text: editText, isEditing: false } : task
      )
    );
    setEditText("");
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

  function filterTasks() {}

  return (
    <div className="slide-in-right bg-zinc-700 text-gray-100 min-h-screen p-5 px-4 sm:px-8 overflow-x-hidden">
      {/*inputs*/}
      <header className="flex flex-col items-center w-full max-w-3xl mx-auto text-center">
        <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-white">
          What’s on your mind today?
        </h1>
        <p className="text-base sm:text-lg mb-6 text-gray-300 italic">
          Every idea starts with a single task.
        </p>

        <div className="flex flex-col md:flex-row gap-2 w-full">
          {/*Task Input*/}
          <input
            className="outline-indigo-600 border-none bg-zinc-500 p-4 text-white rounded w-full"
            placeholder="Enter Task"
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") addTasks();
            }}
          />
          {/* Add Task Button */}

          <button
            className="bg-indigo-600 px-4 py-2 text-white rounded hover:text-green-500 hover:bg-indigo-700 transition w-full md:w-auto"
            onClick={addTasks}
          >
            Add Task
          </button>
        </div>
        <nav></nav>
      </header>

      {tasks.length > 0 && (
        <main className="slide-in-right mt-10 w-full max-w-3xl mx-auto px-1">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
            <span className="border-4 rounded border-indigo-600 px-3 py-1 text-white text-lg">
              All Tasks
            </span>
            {/*Clear all tasks button*/}
            <div className="flex justify-evenly ">
              <select
                id="filter"
                className="bg-indigo-600 mr-2 text-white px-2 py-1 rounded focus:outline-none transition"
              >
                <option value="All" className="hover:bg-indigo-700">
                  All
                </option>
                <option value="Favorites" className="hover:bg-indigo-700">
                  Favorites
                </option>
                <option value="Completed" className="hover:bg-indigo-700">
                  Completed
                </option>
              </select>
              <button
                className="bg-indigo-600 px-4 py-2 rounded text-white hover:bg-indigo-700 hover:text-red-500 transition duration-300"
                onClick={clearTasks}
                title="Clear All Tasks"
              >
                Clear Tasks
              </button>
            </div>
          </div>
          {/*All Tasks Container*/}
          <ul className="p-3 border-2 border-indigo-600 rounded-lg space-y-3">
            {tasks.map((task) => (
              <li key={task.id}>
                <TaskComponent
                  task={task}
                  deleteTask={deleteTask}
                  toggleFavorite={toggleFavorite}
                  toggleTaskEditing={toggleTaskEditing}
                  setEditText={setEditText}
                  editText={editText}
                  saveEdit={saveEdit}
                />
              </li>
            ))}
          </ul>
        </main>
      )}
    </div>
  );
}

export default App;
