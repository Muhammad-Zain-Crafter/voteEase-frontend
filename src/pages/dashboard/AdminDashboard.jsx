import { useEffect, useState } from "react";
import CandidateList from "../candidate/CandidateList";
import { useNavigate } from "react-router-dom";
import API from "../../API";

const AdminDashboard = () => {
  const [stats, setStats] = useState({ totalCandidates: 0, totalVotes: 0 });
  const [loading, setLoading] = useState(false); // For button loading state
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await API.get("/api/v1/candidates/vote/count");
        const candidates = res.data.data || [];
        const totalVotes = candidates.reduce(
          (sum, c) => sum + (c.voteCount || 0),
          0
        );
        setStats({ totalCandidates: candidates.length, totalVotes });
      } catch (err) {
        console.error("Error fetching stats", err);
      }
    };
    fetchStats();
  }, []);

  const handleResetVotes = async () => {
    if (!window.confirm("Are you sure you want to reset all votes?")) return;

    setLoading(true);
    try {
      await API.post("/api/v1/candidates/reset-votes");
      setStats((prev) => ({ ...prev, totalVotes: 0 })); // Reset votes in state
      alert("Votes have been reset successfully!");
    } catch (err) {
      console.error("Error resetting votes", err);
      alert("Failed to reset votes.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold text-blue-600 mb-6 text-center sm:text-left">
          Admin Dashboard
        </h2>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div className="bg-white p-4 shadow rounded-lg text-center sm:text-left">
            <h3 className="text-lg font-semibold">Total Candidates</h3>
            <p className="text-2xl text-blue-600">{stats.totalCandidates}</p>
          </div>
          <div className="bg-white p-4 shadow rounded-lg text-center sm:text-left">
            <h3 className="text-lg font-semibold">Total Votes</h3>
            <p className="text-2xl text-green-600">{stats.totalVotes}</p>
          </div>
        </div>

        {/* Candidate Management */}
        <div className="bg-white p-4 sm:p-6 shadow rounded-lg">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 mb-4">
            <h3 className="text-xl font-semibold text-center sm:text-left">
              Manage Candidates
            </h3>
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              <button
                onClick={() => navigate("/admin/candidates/create")}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 w-full sm:w-auto"
              >
                + Add Candidate
              </button>
              <button
                onClick={handleResetVotes}
                disabled={loading}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 w-full sm:w-auto"
              >
                {loading ? "Resetting..." : "Reset Votes"}
              </button>
            </div>
          </div>
          <CandidateList />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
