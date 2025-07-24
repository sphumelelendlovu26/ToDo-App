function TaskComponent({ task, deleteTask }) {
  return (
    <div
      className={`${task.deleting ? "slide-out-right" : "slide-in-right"}  p-3 m-2 flex  hover:scale-101 hover:border-indigo-500 transition duration-300 ease-in-out  hover:border justify-between bg-zinc-600 rounded
      hover:shadow-xl`}
    >
      <div>
        <p className=" text-center break-word w-full  ">{task.text}</p>
      </div>
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
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
