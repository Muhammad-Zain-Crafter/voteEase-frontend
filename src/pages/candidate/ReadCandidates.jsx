import { useEffect, useState } from "react";
import axios from "axios";

const ReadCandidates = () => {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const res = await axios.get("/api/v1/candidates/c");
        setCandidates(res.data?.data || []);
      } catch (err) {
        console.error("Error fetching candidates:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCandidates();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg font-semibold text-gray-600">Loading candidates...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold text-blue-600 mb-6 text-center">
          List of Candidates
        </h2>

        {candidates.length === 0 ? (
          <p className="text-center text-gray-600">No candidates available.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {candidates.map((candidate) => (
              <div
                key={candidate._id}
                className="bg-white shadow-lg rounded-2xl p-5 flex flex-col items-center text-center hover:shadow-xl transition"
              >
                {/* Candidate Image */}
                {candidate.photo ? (
                  <img
                    src={candidate.photo}
                    alt={candidate.name}
                    className="w-24 h-24 object-cover rounded-full border-4 border-blue-500 mb-4"
                  />
                ) : (
                  <div className="w-24 h-24 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 text-2xl font-bold mb-4">
                    {candidate.name?.charAt(0) || "?"}
                  </div>
                )}

                {/* Candidate Info */}
                <h3 className="text-lg font-semibold">{candidate.name}</h3>
                <p className="text-sm text-gray-600">{candidate.party || "Independent"}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {candidate.age || "No description provided"}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReadCandidates;
