import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditCandidate = () => {
  const { candidateId  } = useParams();
  const navigate = useNavigate();

  const [candidate, setCandidate] = useState({
    name: "",
    party: "",
    age: ""
  });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  // Fetch candidate by ID
  useEffect(() => {
    const fetchCandidate = async () => {
      try {
        const res = await axios.get(`/api/v1/candidates/c/${candidateId }`);
        setCandidate(res.data.data);
      } catch (err) {
        console.error("Error fetching candidate", err);
        setMessage("Failed to load candidate details");
      } finally {
        setLoading(false);
      }
    };
    fetchCandidate();
  }, [candidateId ]);

  // Handle input changes
  const handleChange = (e) => {
    setCandidate({ ...candidate, [e.target.name]: e.target.value });
  };

  // Handle update
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`/api/v1/candidates/c/${candidateId }`, candidate);
      setMessage("Candidate updated successfully!");
      setTimeout(() => navigate("/admin/candidates"), 1500); // redirect back after success
    } catch (err) {
      console.error("Error updating candidate", err);
      setMessage("Failed to update candidate.");
    }
  };

  if (loading) return <p>Loading candidate...</p>;

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-md rounded-xl">
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">
        Edit Candidate
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
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Update Candidate
        </button>
      </form>
    </div>
  );
};

export default EditCandidate;
