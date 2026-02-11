import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CandidateList = () => {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch candidates with vote counts
  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const res = await axios.get("/api/v1/candidates/vote/count"); 
        setCandidates(res.data.data || []);
      } catch (err) {
        console.error("Error fetching candidates", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCandidates();
  }, []);

  // Delete candidate
  const handleDelete = async (candidateId) => {
    if (!window.confirm("Are you sure you want to delete this candidate?")) return;

    try {
      await axios.delete(`/api/v1/candidates/c/${candidateId}`);
      setCandidates(candidates.filter((c) => c._id !== candidateId));
    } catch (err) {
      console.error("Error deleting candidate", err);
      alert("Failed to delete candidate.");
    }
  };

  if (loading) return <p>Loading candidates...</p>;

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-blue-600 text-white">
            <th className="border border-gray-300 p-2">Name</th>
            <th className="border border-gray-300 p-2">Party</th>
            <th className="border border-gray-300 p-2">Votes</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {candidates.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center p-4">
                No candidates found.
              </td>
            </tr>
          ) : (
            candidates.map((candidate) => (
              <tr key={candidate._id} className="hover:bg-gray-100">
                <td className="border border-gray-300 p-2">{candidate.name}</td>
                <td className="border border-gray-300 p-2">{candidate.party}</td>
                <td className="border border-gray-300 p-2">{candidate.voteCount || 0}</td>
                <td className="border border-gray-300 p-2 flex gap-2 justify-center">
                  <button
                    onClick={() => navigate(`/admin/candidates/edit/${candidate._id}`)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(candidate._id)}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CandidateList;
