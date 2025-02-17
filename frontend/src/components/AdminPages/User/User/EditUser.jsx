import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import SummaryApi from "../../../../API/BackendApi";

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null); // Initially set to null to avoid uncontrolled inputs
  console.log(id);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(SummaryApi.getUserById.url(id));
        if (!response.ok) throw new Error("Failed to fetch user");
        const data = await response.json();
        setUser(data); // Set user state with fetched data
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(SummaryApi.updateUserById.url(id), {  // Corrected API method
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });

      if (!response.ok) throw new Error("Failed to update user");

      navigate("/admin/users"); // Redirect back to user list
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  if (!user) {
    return <div className="text-center mt-5 text-gray-600">Loading user data...</div>; // Show loading state
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="p-6 w-full max-w-lg bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Edit User</h2>
        <div className="space-y-3">
          {["name", "email", "phone", "address", "role"].map((field) => (
            <div key={field} className="flex flex-col">
              <label className="font-semibold capitalize">{field}:</label>
              <input
                type="text"
                name={field}
                value={user[field] || ""}
                onChange={handleChange}
                className="border px-3 py-2 rounded-md"
              />
            </div>
          ))}
        </div>
        <div className="mt-4 flex gap-3">
          <button onClick={handleUpdate} className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
            Save
          </button>
          <button onClick={() => navigate("/admin/users")} className="bg-gray-400 text-white px-4 py-2 rounded-md">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditUser;
