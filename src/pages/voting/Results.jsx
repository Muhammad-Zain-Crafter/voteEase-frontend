import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Results = () => {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      setMessage("");

      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setMessage("You must be logged in to view results.");
          setLoading(false);
          return;
        }

        const res = await axios.get("/api/v1/candidates/vote/count", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = res.data.data || [];
        setCandidates(data);
      } catch (err) {
        console.error(err);

        // Display meaningful message based on backend response
        if (err.response?.status === 403) {
          setMessage(err.response.data.message || "Voting is still open.");
        } else if (err.response?.status === 404) {
          setMessage("No candidates found.");
        } else {
          setMessage("Failed to fetch results.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, []);

  // Calculate total votes
  const totalVotes = candidates.reduce((sum, c) => sum + (c.voteCount || 0), 0);

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-500 to-indigo-400 p-6 flex justify-center items-center">
      <div className="max-w-3xl w-full bg-white shadow-lg rounded-2xl p-6">
        <h2 className="text-2xl font-bold text-center text-indigo-600 mb-6">
          Voting Results
        </h2>

        {loading && (
          <p className="text-center text-gray-600">Loading results...</p>
        )}

        {message && !loading && (
          <div className="text-center">
            <p className="text-red-600 font-semibold mb-4">{message}</p>
            {!localStorage.getItem("token") && (
              <button
                onClick={() => navigate("/login")}
                className="bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition"
              >
                Login to view results
              </button>
            )}
          </div>
        )}

        {!message && !loading && candidates.length > 0 && (
          <div className="space-y-6">
            {candidates.map((candidate) => {
              const percentage =
                totalVotes > 0
                  ? ((candidate.voteCount / totalVotes) * 100).toFixed(1)
                  : 0;

              return (
                <div key={candidate._id}>
                  <div className="flex justify-between mb-1">
                    <span className="font-semibold text-gray-700">
                      {candidate.name} ({candidate.party})
                    </span>
                    <span className="text-sm text-gray-600">
                      {percentage}% ({candidate.voteCount} votes)
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-4">
                    <div
                      className="bg-indigo-600 h-4 rounded-full transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}

            <div className="mt-6 text-center font-semibold text-gray-700">
              Total Votes: {totalVotes}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Results;
