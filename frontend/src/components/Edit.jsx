import { useState } from "react";
export default function EditModal({ data, onClose, setload, load }) {
  const [title, setTitle] = useState(data.title);
  const [category, setCategory] = useState(data.category);
  const [status, setStatus] = useState(data.status);



  async function handleSubmit() {
    const updated = {
      _id: data._id,
      title,
      category,
      status
    };
    const response = await fetch("http://localhost:5000/info/dashboardupdate", {
      "method": "PUT",
      "headers": {
        "Content-Type": "application/json",
        "token": localStorage.getItem("token")
      },
      body: JSON.stringify(updated)
    })
    const result = await response.json()
    console.log("hi neeraj", result)

    if (result) {
      setload(!load);
    }




    onClose();
  };

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50">
      <div className="flex w-[90%] md:w-[360px] flex-col gap-4 rounded-xl bg-white p-6 shadow-xl animate-in fade-in zoom-in duration-200">
        <h2 className="text-xl font-bold text-gray-800">Edit Entry</h2>

        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="w-full rounded-lg border-[1.8px] border-gray-300 bg-gray-50 p-2.5 text-sm outline-none transition duration-200 focus:border-blue-500 focus:bg-white focus:shadow-[0_0_5px_rgba(76,139,245,0.3)]"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full rounded-lg border-[1.8px] border-gray-300 bg-gray-50 p-2.5 text-sm outline-none transition duration-200 focus:border-blue-500 focus:bg-white focus:shadow-[0_0_5px_rgba(76,139,245,0.3)]"
        >
          <option value="sports">Sports</option>
          <option value="tech">Tech</option>
          <option value="news">News</option>
        </select>

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full rounded-lg border-[1.8px] border-gray-300 bg-gray-50 p-2.5 text-sm outline-none transition duration-200 focus:border-blue-500 focus:bg-white focus:shadow-[0_0_5px_rgba(76,139,245,0.3)]"
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>

        <div className="mt-2 flex gap-4">
          <button
            onClick={handleSubmit}
            className="flex-1 rounded-lg bg-blue-600 py-2.5 text-sm font-semibold text-white transition duration-200 hover:bg-blue-700"
          >
            Save
          </button>
          <button
            onClick={onClose}
            className="flex-1 rounded-lg bg-gray-200 py-2.5 text-sm font-semibold text-gray-800 transition duration-200 hover:bg-gray-300"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
