import { useEffect, useState } from "react";
import axios from "axios";
import { Users, UserCircle } from "lucide-react";

const VoterDashboard = () => {
  const [candidates, setCandidates] = useState([]);
  const [profile, setProfile] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [votedCandidate, setVotedCandidate] = useState(null);
  const [isVotingOpen, setIsVotingOpen] = useState(false); // 👈 new

  // Fetch profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("/api/v1/users/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfile(res.data.data);

        if (res.data.data.votedFor) {
          setVotedCandidate(res.data.data.votedFor);
        }
      } catch (err) {
        console.error(err);
        setMessage(err.response?.data?.message || "Failed to load profile");
      }
    };
    fetchProfile();
  }, []);

  // Fetch candidates
  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const res = await axios.get("/api/v1/candidates/c");
        setCandidates(res.data.data || []);
      } catch (err) {
        console.error(err);
        setMessage("Failed to load candidates");
      }
    };
    fetchCandidates();
  }, []);

  // Fetch voting status
  useEffect(() => {
    const fetchVotingStatus = async () => {
      try {
        const res = await axios.get("/api/v1/voting-status/status");
        setIsVotingOpen(res.data.data.isVotingOpen);
      } catch (err) {
        console.error(err);
        setMessage("Failed to load voting status");
      }
    };
    fetchVotingStatus();
  }, []);

  // Handle voting
  const handleVote = async (candidateId) => {
    if (!isVotingOpen) {
      setMessage("Voting is closed! You cannot vote right now.");
      return;
    }

    if (votedCandidate) {
      setMessage("You have already voted!");
      return;
    }

    setLoading(true);
    setMessage("");
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `/api/v1/candidates/vote/${candidateId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage("Vote cast successfully!");
      setVotedCandidate(candidateId);
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to cast vote");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-blue-300 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-6">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
          Voter Dashboard
        </h2>

        {message && (
          <p className="text-center mb-4 font-semibold text-black">{message}</p>
        )}

        {/* Profile Section */}
        {profile && (
          <div className="mb-8 border border-gray-200 rounded-xl shadow-sm bg-gray-50 p-5">
            <div className="flex items-center gap-4">
              <UserCircle className="w-12 h-12 text-blue-600" />
              <div>
                <h3 className="text-lg font-semibold text-gray-700">
                  {profile.username}
                </h3>
                <p className="text-sm text-gray-600">{profile.email}</p>
                <p className="text-sm text-gray-600 capitalize">
                  Role: {profile.role}
                </p>
                {votedCandidate && (
                  <p className="text-sm text-green-600 font-semibold">
                    You have already voted.
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Candidates Section */}
        <h1 className="font-bold text-lg mb-2 flex items-center gap-2">
          <Users className="w-5 h-5 text-blue-600" />
          List of Candidates:
        </h1>
        {candidates.length === 0 ? (
          <p className="text-center text-gray-600">No candidates available</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {candidates.map((candidate) => (
              <div
                key={candidate._id}
                className="border rounded-xl p-4 shadow-md hover:shadow-lg transition bg-white"
              >
                <h3 className="text-lg font-bold ">
                  Name:{" "}
                  <span className="font-semibold text-gray-600">
                    {candidate.name}
                  </span>
                </h3>
                <p className="text-lg font-bold">
                  Party:{" "}
                  <span className="font-semibold text-gray-600">
                    {candidate.party || "Independent"}
                  </span>
                </p>
                <p className="text-lg font-bold">
                  Age:{" "}
                  <span className="font-semibold text-gray-600">
                    {candidate.age}
                  </span>
                </p>
                <button
                  onClick={() => handleVote(candidate._id)}
                  disabled={
                    loading ||
                    !isVotingOpen ||
                    (votedCandidate && votedCandidate !== candidate._id)
                  }
                  className={`w-full mt-4 py-2 rounded-lg text-white ${
                    !isVotingOpen
                      ? "bg-gray-400 cursor-not-allowed"
                      : votedCandidate === candidate._id
                      ? "bg-green-600 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
                  }`}
                >
                  {!isVotingOpen
                    ? "Voting Closed"
                    : votedCandidate === candidate._id
                    ? "Voted"
                    : loading
                    ? "Voting..."
                    : "Vote"}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default VoterDashboard;
