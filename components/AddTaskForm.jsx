'use client';
import { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const AddTaskForm = () => {
  const [judul, setJudul] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false); // Added loading state

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!judul || !deskripsi || !status) {
      return toast.error("Please fill all fields");
    }

    setLoading(true); // Set loading state when starting the request

    try {
      const res = await fetch("http://localhost:3000/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ judul, deskripsi, status }),
      });

      if (res.ok) {
        toast.success("Task created successfully");
        window.location.href = "/task-list"; // Redirect using window.location
      } else {
        toast.error("Failed to create task. Please try again later.");
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <main className="min-h-screen bg-gray-900 text-white p-4">
    <div className="flex flex-col h-screen max-w-4xl mx-auto">
      <h1 className="text-3xl text-center">Add Task</h1>
      <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
        {/* Task Name Field */}
        <div className="mb-5">
          <label
            htmlFor="judul"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Judul
          </label>
          <input
            type="text"
            id="judul"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter task name"
            onChange={(e) => setJudul(e.target.value)} value={judul}
          />
        </div>

        {/* Task Detail Field */}
        <div className="mb-5">
          <label
            htmlFor="deskripsi"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Deskripsi
          </label>
          <input
            type="text"
            id="deskripsi"
            placeholder="Enter task details"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={(e) => setDeskripsi(e.target.value)} value={deskripsi}
          />
        </div>

        {/* Status Field */}
        <div className="mb-5">
          <label
            htmlFor="status"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Status
          </label>
          <select
            id="status"
            onChange={(e) => setStatus(e.target.value)} value={status}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
          disabled={loading} // Disable button when loading
        >
          {loading ? (
            <span className="flex justify-center items-center">
              <svg
                className="w-5 h-5 mr-3 text-white animate-spin"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 3v1m0 16v1m9-9h-1m-16 0H3m16.95 4.95l-.707-.707M6.757 6.757l-.707.707m12.73 0l-.707-.707M5.805 16.243l-.707.707"
                />
              </svg>
              Creating...
            </span>
          ) : (
            "Create Data"
          )}
        </button>
      </form>
    </div>
    </main>
  );
};

export default AddTaskForm;
