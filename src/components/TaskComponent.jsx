import { FaStar, FaRegStar, FaTrash, FaRegSave, FaEdit } from "react-icons/fa";

function TaskComponent({
  task,
  deleteTask,
  toggleFavorite,
  toggleTaskEditing,
  editText,
  setEditText,
  saveEdit,
}) {
  return (
    <div
      className={`${
        task.deleting ? "slide-out-right" : "slide-in-right"
      } p-0 m-1 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-zinc-600 rounded transition duration-300 ease-in-out hover:scale-100 hover:border hover:border-indigo-500 hover:shadow-xl`}
    >
      {task.isEditing ? (
        <div className="w-full  h-10 flex justify-between focus:outline-1 hover:cursor-text focus:bg-indigo-500">
          <input
            placeholder="Edit Text Here"
            className="min-w-md  p-2"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                saveEdit(task.id);
              }
            }}
            onBlur={() => toggleTaskEditing(task.id)}
          />
          <button>
            <FaRegSave
              size={20}
              color="violet"
              title="Save"
              className="hover:text-green-600 cursor-pointer"
              onClick={() => saveEdit(task.id)}
            />
          </button>
        </div>
      ) : (
        <div className="w-full  ">
          <button className="ml-2 hover:cursor-pointer" title="Edit">
            <FaEdit onClick={() => toggleTaskEditing(task.id)} />
          </button>
          <p className="text-left p-2 break-words text-white max-w-full sm:max-w-md">
            {task.text}
          </p>
        </div>
      )}

      <div className="w-full sm:w-auto flex flex-row justify-start sm:justify-end gap-2 p-2">
        <button
          className="bg-indigo-600  px-2 py-2 rounded text-yellow-200 active:opacity-50 transition duration-300 active:scale-95"
          onClick={() => toggleFavorite(task.id)}
        >
          {task.isFavorite ? (
            <FaStar
              size={20}
              color="gold"
              title="Remove To Favorites"
              className="hover:text-yellow-600 cursor-pointer"
            />
          ) : (
            <FaRegStar
              size={20}
              title="Add To Favorites"
              className="hover:text-yellow-600 cursor-pointer"
            />
          )}
        </button>
        <button
          className="bg-indigo-600  active:opacity-50  text-white px-2 py-2 rounded hover:text-red-500 transition duration-300"
          onClick={() => deleteTask(task.id)}
        >
          {
            <FaTrash
              title="Delete Task"
              className="text-red-500 hover:text-red-700 cursor-pointer active:opacity-50 transition duration-300"
            />
          }
        </button>
      </div>
    </div>
  );
}

export default TaskComponent;
