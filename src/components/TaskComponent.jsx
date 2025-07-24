function TaskComponent({ task, deleteTask }) {
  return (
    <div className=" p-3 m-2 flex  hover:scale-101 hover:border-indigo-500 transition duration-300  hover:border justify-between bg-zinc-600 rounded">
      <div>
        <p className=" text-center  ">{task.text}</p>
      </div>
      <div>
        <button className="bg-indigo-600 w-auto p-2 rounded hover:text-yellow-400 transition duration-300">
          Add To Favorites
        </button>
        <button
          className=" ml-3 bg-indigo-600 w-auto p-2 rounded hover:text-red-500 transition duration-300"
          onClick={() => deleteTask(task.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default TaskComponent;
