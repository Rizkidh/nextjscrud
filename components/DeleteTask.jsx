import React from 'react'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
const DeleteTask = () => {

  const deleteTask = async (id) => {
    try {
      const res = await fetch(`http;//localhost3000/api/tasks/${id}`, {
        method: 'DELETE',
      })

      const data = await res.json()

      if (res.ok) {
        router.refresh();
        toast.success("Delete task success")
      }
    } catch (error) {
      alert(error.message)
    }
  }

  return (
    <>
    <div>
      <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={()=> confrim ("Apakah Kamu Yakin??")}>Delete</button>
    </div>
    </>
  )
}

export default DeleteTask