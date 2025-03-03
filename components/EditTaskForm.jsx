const EditTaskForm = () => {
  return (
    <div className="container m-4 p-4">
      <h1 className="text-3xl text-center">Edit Task</h1>
      <form className="max-w-sm mx-auto">
        {/* Task Name Field */}
        <div className="mb-5">
          <label
            htmlFor="taskname"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Task Name
          </label>
          <input
            type="text"
            id="taskname"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter task name"
            required
          />
        </div>

        {/* Task Detail Field */}
        <div className="mb-5">
          <label
            htmlFor="taskdetail"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Task Detail
          </label>
          <input
            type="text"
            id="taskdetail"
            placeholder="Enter task details"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>

        {/* Status Field (Changed from password to text) */}
        <div className="mb-5">
          <label
            htmlFor="status"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Status
          </label>
          <select
            id="status"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          >
            <option value="">Select status</option>
            <option value="not-started">Not Started</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Update Data
        </button>
      </form>
    </div>
  )
}

export default EditTaskForm