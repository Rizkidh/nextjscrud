'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import DeleteTask from './DeleteTask';

const TaskList = () => {
  const [tasks, setTasks] = useState([]); // State to store tasks
  const [loading, setLoading] = useState(true); // State to track loading
  const [error, setError] = useState(null); // State to track error

  // Fetch tasks from the API when the component mounts
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await fetch('http://localhost:3000/api/tasks'); // Adjust the URL if needed
        if (res.ok) {
          const data = await res.json();
          setTasks(data); // Set the fetched tasks to state
        } else {
          throw new Error('Failed to fetch tasks');
        }
      } catch (error) {
        setError(error.message); // Set error state if the fetch fails
      } finally {
        setLoading(false); // Set loading to false once data is fetched
      }
    };

    fetchTasks();
  }, []); // Empty array ensures this effect runs only once when the component mounts

  if (loading) {
    return <div>Loading...</div>; // Display loading text while data is being fetched
  }

  if (error) {
    return <div>Error: {error}</div>; // Display error message if there's an issue fetching tasks
  }

  return (
    <div>
      <div className="container m-4 p-4">
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

        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Task Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Task Detail
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {tasks.length > 0 ? (
                tasks.map((task) => (
                  <tr key={task.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {task.judul} {/* Assuming task has a 'judul' field */}
                    </th>
                    <td className="px-6 py-4">{task.deskripsi}</td> {/* Assuming task has a 'deskripsi' field */}
                    <td className="px-6 py-4">{task.status}</td> {/* Assuming task has a 'status' field */}
                    <td>
                      <div className="px-6 py-4">
                        <Link href={`/edit-task/${task.id}`}>
                          <button
                            type="submit"
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
    </div>
  );
};

export default TaskList;
