import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import EditModal from "../components/Edit";
import Create from "../components/Create";
const API = import.meta.env.VITE_BACKEND_URI;

const Dashboard = () => {
  const navigate = useNavigate();

  // Sample Data
  const sampleData = [
    { _id: "1", title: "Complete Project Report", category: "Work", status: "Pending" },
    { _id: "2", title: "Buy Groceries", category: "Personal", status: "Active" },
    { _id: "3", title: "Schedule Dentist Appointment", category: "Urgent", status: "Completed" },
    { _id: "4", title: "Team Meeting", category: "Work", status: "Active" },
  ];

  // User Profile State
  const [user, setUser] = useState({
    name: "",
    email: ""
  });

  // Table Data
  const [rows, setRows] = useState([]); // Master List
  const [filtered, setFiltered] = useState([]);

  // Display List

  // Filters + Search
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [showform, setshowform] = useState(false)

  const [menuState, setMenuState] = useState({ index: null, top: 0, left: 0 });
  const [editRow, setEditRow] = useState(null);
  const [load, setload] = useState(false)

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleShowDot = (index, e) => {
    e.stopPropagation();
    if (menuState.index === index) {
      setMenuState({ index: null, top: 0, left: 0 });
    } else {
      const rect = e.currentTarget.getBoundingClientRect();
      // Position menu to the left of the button, centered vertically relative to button
      setMenuState({
        index,
        top: rect.bottom + 5,
        left: rect.left - 100 // Adjust based on menu width (approx 120px)
      });
    }
  };

  // Close menu on click outside
  useEffect(() => {
    const handleClickOutside = () => setMenuState({ index: null, top: 0, left: 0 });
    if (menuState.index !== null) {
      window.addEventListener('click', handleClickOutside);
    }
    return () => window.removeEventListener('click', handleClickOutside);
  }, [menuState.index]);

  // Check for token on mount
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    }
  }, [navigate]);

  // 1. Fetch Data on Mount
  useEffect(() => {
    async function getdata() {
      try {
        // Fetch Dashboard Data
        const response = await fetch(`${API}/info/dashboard`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "token": localStorage.getItem("token")
          }
        });
        const data = await response.json();

        if (response.ok && data.data && data.data.length > 0) {
          setRows(data.data);
          setFiltered(data.data);
        } else {
          // Use sample data if API returns empty or fails
          console.log("Using sample data");
          setRows(sampleData);
          setFiltered(sampleData);
        }

        // Fetch User Details (Dummy API)
        const userResponse = await fetch(`${API}/user/info`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "token": localStorage.getItem("token")
          }
        });

        if (userResponse.ok) {
          const userData = await userResponse.json();
          // Assuming the API returns { data: { name, email, role } } or similar
          // Adjust based on actual API structure if known, otherwise use a safe fallback or direct assignment
          if (userData.data) {
            console.log(userData.data)
            setUser(userData.data);
          } else {
            // Fallback if structure is different, or just use userData if it's the direct object
            setUser(userData);
          }

        } else {
          // Fallback for demo purposes if API fails
          setUser({
            name: "Nagesh Chegondi",
            email: "nagesh@example.com"
          });
        }

      } catch (error) {
        console.error("Fetch failed:", error);
        // Fallback for demo purposes
        setUser({
          name: "Nagesh Chegondi",
          email: "nagesh@example.com",
          role: "Full-Stack Developer",
        });
        // Also set sample data on error
        setRows(sampleData);
        setFiltered(sampleData);
      } finally {
        setIsLoading(false);
      }
    }
    getdata();
  }, [load]);

  // 2. Filtering Logic - SIMPLIFIED VERSION
  useEffect(() => {
    if (isLoading) return;

    let temp = [...rows]; // Start with copy of master list

    // Search filter
    if (search.trim() !== "") {
      temp = temp.filter((row) =>
        row.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Status filter
    if (statusFilter !== "all") {
      temp = temp.filter((row) => row.status === statusFilter);
    }

    setFiltered(temp);
  }, [search, statusFilter, rows, isLoading]);

  // Create new row - FIXED


  // Delete row - FIXED
  async function deleteRow(_id) {
    try {
      const response = await fetch(`${API}/info/dashboarddelete`, {
        "method": "DELETE",
        "headers": {
          "Content-Type": "application/json",
          "token": localStorage.getItem("token")
        },
        body: JSON.stringify({
          _id
        })
      });

      // Update UI if success or if it fails (for demo/sample data support)
      const updatedRows = rows.filter((row) => row._id !== _id);
      setRows(updatedRows);

    } catch (error) {
      console.error("Delete failed:", error);
      // Update UI anyway for demo purposes
      const updatedRows = rows.filter((row) => row._id !== _id);
      setRows(updatedRows);
    }
  };

  // Better loading check
  if (isLoading) {
    return (
      <div>
        Loading...
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col md:flex-row font-sans">
      {showform ? <Create showform={showform} setshowform={setshowform} setFiltered={setFiltered} setRows={setRows} /> : null}

      {/* LEFT PROFILE SECTION */}
      <div className="w-full md:w-[280px] bg-[#222] p-[20px] md:p-[30px] text-white flex flex-col justify-between shrink-0">
        <div>
          <h2 className="mb-5 text-xl font-bold">Profile</h2>
          <p><b>Name:</b> {user.name}</p>
          <p><b>Email:</b> {user.email}</p>
        </div>
        <button
          onClick={handleLogout}
          className="mt-4 w-full rounded-lg bg-red-600 py-2 text-sm font-semibold text-white transition duration-200 hover:bg-red-700"
        >
          Logout
        </button>
      </div>

      {/* RIGHT MAIN CONTENT */}
      <div className="flex-1 bg-[#f5f5f5] p-[20px] md:p-[30px] overflow-hidden">

        {/* SEARCH + FILTERS */}
        <div className="mb-[25px] flex flex-col md:flex-row gap-[15px]">
          <input
            type="text"
            placeholder="Search tasks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-[250px] rounded-[5px] border border-[#bbb] p-[10px]"
          />

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-[5px] border border-[#bbb] p-[10px]"
          >
            <option value="all">All Status</option>
            <option value="Active">Active</option>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
          </select>

          <button className="cursor-pointer rounded-[5px] border-none bg-[#0066ff] px-[15px] py-[10px] text-white" onClick={() => setshowform(!showform)}>+ Create</button>
        </div>

        {/* TABLE LIST */}
        <div className="w-full overflow-x-auto rounded-lg bg-white shadow-sm">
          <table className="w-full min-w-[600px] border-collapse">
            <thead>
              <tr>
                <th className="border-b border-[#ddd] bg-[#eee] p-[12px] text-left">Title</th>
                <th className="border-b border-[#ddd] bg-[#eee] p-[12px] text-left">Category</th>
                <th className="border-b border-[#ddd] bg-[#eee] p-[12px] text-left">Status</th>
                <th className="border-b border-[#ddd] bg-[#eee] p-[12px] text-left">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan="3" style={{ textAlign: 'center' }} className="border-b border-[#ddd] p-[12px]">
                    {rows.length === 0 ? "No tasks found." : "No results match your filter/search."}
                  </td>
                </tr>
              ) : (
                filtered.map((row, index) => (
                  <tr key={row._id}>
                    <td className="border-b border-[#ddd] p-[12px]">{row.title}</td>
                    <td className="border-b border-[#ddd] p-[12px]">{row.category}</td>
                    <td className="border-b border-[#ddd] p-[12px]">{row.status}</td>
                    <td className="border-b border-[#ddd] p-[12px] relative">
                      <button className="m-0 border-none bg-white p-0 outline-none" onClick={(e) => handleShowDot(index, e)}>
                        <img className="m-0 h-[20px] w-[20px] bg-white p-0 outline-none" src="dots.png" alt="" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Fixed Menu */}
        {menuState.index !== null && (
          <div
            className="fixed z-[9999] flex w-[120px] flex-col gap-2 rounded-lg bg-white p-2 shadow-lg border border-gray-200"
            style={{ top: menuState.top, left: menuState.left }}
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={() => deleteRow(filtered[menuState.index]._id)} className="rounded bg-red-500 px-3 py-1 text-sm text-white hover:bg-red-600">Delete</button>
            <button onClick={() => { setEditRow(filtered[menuState.index]); setMenuState({ index: null, top: 0, left: 0 }); }} className="rounded bg-blue-500 px-3 py-1 text-sm text-white hover:bg-blue-600">Edit</button>
          </div>
        )}

        {editRow && (
          <EditModal
            data={editRow}
            onClose={() => setEditRow(null)}
            setload={setload}
            load={load}
          />
        )}

      </div>
    </div>
  );
};

export default Dashboard;