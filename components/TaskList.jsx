"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import DeleteTask from "./DeleteTask";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await fetch("/api/tasks"); // ✅ Relative URL, safe for deployment
        if (res.ok) {
          const data = await res.json();
          setTasks(data);
        } else {
          throw new Error("Failed to fetch tasks");
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <main className="bg-gray-900 text-white p-4 min-h-0 h-full">
      <div className="flex flex-col max-w-4xl mx-auto h-full">
        <h1 className="text-3xl text-center mb-6">Task List</h1>

        <div className="flex justify-end mb-4">
          <Link href="/add-task">
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Add Task
            </button>
          </Link>
        </div>

        <div className="flex-1 relative overflow-x-auto overflow-y-auto">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">Task Name</th>
                <th scope="col" className="px-6 py-3">Task Detail</th>
                <th scope="col" className="px-6 py-3">Status</th>
                <th scope="col" className="px-6 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {tasks.length > 0 ? (
                tasks.map((task) => (
                  <tr
                    key={task.id || task._id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200"
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {task.judul}
                    </th>
                    <td className="px-6 py-4">{task.deskripsi}</td>
                    <td className="px-6 py-4">{task.status}</td>
                    <td>
                      <div className="px-6 py-4">
                        <Link href={`/edit-task/${task.id || task._id}`}>
                          <button
                            type="button"
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                          >
                            Edit Task
                          </button>
                        </Link>
                        <DeleteTask id={task._id} />
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center px-6 py-4">
                    No tasks available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
};

export default TaskList;
