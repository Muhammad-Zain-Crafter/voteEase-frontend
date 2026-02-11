import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CreateCandidate = () => {
  const navigate = useNavigate();

  const [candidate, setCandidate] = useState({
    name: "",
    party: "",
    age: ""
  });
  const [message, setMessage] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    setCandidate({ ...candidate, [e.target.name]: e.target.value });
  };

  // Handle create candidate
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "/api/v1/candidates/create-candidate",
        candidate,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setMessage("Candidate created successfully!");
      setTimeout(() => navigate("/admin/candidates"), 1500);
    } catch (err) {
      console.error("Error creating candidate", err);
      setMessage("Failed to create candidate.");
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-md rounded-xl">
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">
        Create Candidate
      </h2>

      {message && (
        <p className="text-center mb-4 font-semibold text-gray-700">{message}</p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={candidate.name}
            onChange={handleChange}
            required
            className="w-full border rounded-lg p-2 focus:ring focus:ring-blue-300"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700">Party</label>
          <input
            type="text"
            name="party"
            value={candidate.party}
            onChange={handleChange}
            required
            className="w-full border rounded-lg p-2 focus:ring focus:ring-blue-300"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700">Age</label>
          <input
            type="number"
            name="age"
            value={candidate.age}
            onChange={handleChange}
            required
            className="w-full border rounded-lg p-2 focus:ring focus:ring-blue-300"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
        >
          Create Candidate
        </button>
      </form>
    </div>
  );
};

export default CreateCandidate;
