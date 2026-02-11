import { useEffect, useState } from "react";
import axios from "axios";
import img from "../../assets/voting-status.png";

const VotingStatus = () => {
  const [isVotingOpen, setIsVotingOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  // Fetch voting status
  const fetchVotingStatus = async () => {
    try {
      const { data } = await axios.get("/api/v1/voting-status/status");
      console.log("Fetched Voting Status:", data);
      setIsVotingOpen(data.data.isVotingOpen);
    } catch (error) {
      console.error("Error fetching status:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVotingStatus(); // initial fetch

    // Poll every 10s to keep status updated
    const interval = setInterval(fetchVotingStatus, 10000);
    return () => clearInterval(interval); // cleanup
  }, []);

  // Open voting
  const handleOpenVoting = async () => {
    try {
      const { data } = await axios.post(
        "/api/v1/voting-status/open",
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage(data.message);
      setIsVotingOpen(true);
    } catch (error) {
      setMessage(error.response?.data?.message || "Error opening voting");
    }
  };

  // Close voting
  const handleCloseVoting = async () => {
    try {
      const { data } = await axios.post(
        "/api/v1/voting-status/close",
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage(data.message);
      setIsVotingOpen(false);
    } catch (error) {
      setMessage(error.response?.data?.message || "Error closing voting");
    }
  };

  if (loading)
    return <p className="text-center mt-10">Loading voting status...</p>;

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 ">
      <main className="flex-grow flex items-center justify-center">
        <div className="p-6 max-w-lg w-full bg-white shadow-lg rounded-xl text-center">
          <h2 className="md:text-3xl text-2xl font-bold mb-4">Voting Status</h2>

          <p
            className={`mb-4 font-bold ${
              isVotingOpen ? "text-green-600" : "text-red-600"
            }`}
          >
            {isVotingOpen ? "Voting is OPEN" : "Voting is CLOSED"}
          </p>

          <div className="flex justify-center mb-6">
            <img
              src={img}
              alt="Voting Status"
              className="w-40 h-40 object-contain drop-shadow-md"
            />
          </div>

          {message && <p className="mb-4 text-blue-500">{message}</p>}

          {userRole === "admin" && (
            <div className="mt-6 flex justify-center gap-4">
              <button
                onClick={handleOpenVoting}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                disabled={isVotingOpen}
              >
                Open Voting
              </button>
              <button
                onClick={handleCloseVoting}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                disabled={!isVotingOpen}
              >
                Close Voting
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default VotingStatus;
