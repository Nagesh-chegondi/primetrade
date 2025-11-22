import { useState } from "react"
const API = import.meta.env.VITE_BACKEND_URI;

export default function Create({ showform, setshowform, setFiltered, setRows }) {
  const [title, settittle] = useState('')
  const [category, setcategory] = useState('')
  const [status, setstatus] = useState('')
  async function createnew() {
    const phew = {
      title: title,
      category: category,
      status: status
    }
    const response = await fetch(`${API}/info/dashboarddata`, {
      "method": "POST",
      "headers": {
        "Content-Type": "application/json",
        "token": localStorage.getItem("token")
      },
      body: JSON.stringify(phew)
    })
    if (response) {
      setRows((prev) => [...prev, phew])
      setFiltered((prev) => [...prev, phew])
      setshowform(!showform)
    }
  }
  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50">
      <div className="flex w-[90%] md:w-[400px] flex-col gap-4 rounded-xl bg-white p-6 shadow-xl animate-in fade-in zoom-in duration-200">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800">Create New Task</h2>
          <img onClick={() => setshowform(!showform)} className="h-[20px] w-[20px] cursor-pointer hover:opacity-70" src="cross.png" alt="Close" />
        </div>

        <form onSubmit={(e) => { e.preventDefault(); createnew(); }} className="flex flex-col gap-4">

          {/* Text Input */}
          <div className="flex flex-col gap-2">
            <label className="font-semibold text-gray-700">Title:</label>
            <input
              type="text"
              name="title"
              value={title}
              onChange={(e) => settittle(e.target.value)}
              placeholder="Enter title..."
              className="w-full rounded-lg border-[1.8px] border-gray-300 bg-gray-50 p-2.5 text-sm outline-none transition duration-200 focus:border-blue-500 focus:bg-white focus:shadow-[0_0_5px_rgba(76,139,245,0.3)]"
            />
          </div>

          {/* Select Input 1 */}
          <div className="flex flex-col gap-2">
            <label className="font-semibold text-gray-700">Category:</label>
            <select
              name="category"
              value={category}
              onChange={(e) => setcategory(e.target.value)}
              className="w-full rounded-lg border-[1.8px] border-gray-300 bg-gray-50 p-2.5 text-sm outline-none transition duration-200 focus:border-blue-500 focus:bg-white focus:shadow-[0_0_5px_rgba(76,139,245,0.3)]"
            >
              <option value="">Select category</option>
              <option value="Work">Work</option>
              <option value="Personal">Personal</option>
              <option value="Urgent">Urgent</option>
            </select>
          </div>

          {/* Select Input 2 */}
          <div className="flex flex-col gap-2">
            <label className="font-semibold text-gray-700">Status:</label>
            <select
              name="status"
              value={status}
              onChange={(e) => setstatus(e.target.value)}
              className="w-full rounded-lg border-[1.8px] border-gray-300 bg-gray-50 p-2.5 text-sm outline-none transition duration-200 focus:border-blue-500 focus:bg-white focus:shadow-[0_0_5px_rgba(76,139,245,0.3)]"
            >
              <option value="">Select status</option>
              <option value="Active">Active</option>
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="mt-2 w-full rounded-lg bg-[#0066ff] py-2.5 text-sm font-semibold text-white transition duration-200 hover:bg-blue-700"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  )
}