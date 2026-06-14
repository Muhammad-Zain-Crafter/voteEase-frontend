import { useEffect, useState } from "react";
import { Users, UserCircle } from "lucide-react";
import API from "../../API";

const VoterDashboard = () => {
  const [candidates, setCandidates] = useState([]);
  const [profile, setProfile] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [votedCandidate, setVotedCandidate] = useState(null);
  const [isVotingOpen, setIsVotingOpen] = useState(false);

  // ✅ Fetch profile (source of truth)
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await API.get("/api/v1/users/profile");
        const user = res.data.data;

        setProfile(user);
        setVotedCandidate(user.votedFor || null);
      } catch (err) {
        console.error(err);
        setMessage(err.response?.data?.message || "Failed to load profile");
      }
    };

    fetchProfile();
  }, []);

  // ✅ Fetch candidates
  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const res = await API.get("/api/v1/candidates/c");
        setCandidates(res.data.data || []);
      } catch (err) {
        console.error(err);
        setMessage("Failed to load candidates");
      }
    };

    fetchCandidates();
  }, []);

  // ✅ Fetch voting status
  useEffect(() => {
    const fetchVotingStatus = async () => {
      try {
        const res = await API.get("/api/v1/voting-status/status");
        setIsVotingOpen(res.data.data.isVotingOpen);
      } catch (err) {
        console.error(err);
        setMessage("Failed to load voting status");
      }
    };

    fetchVotingStatus();
  }, []);

  const hasVoted = !!votedCandidate;

  // ✅ Handle vote
  const handleVote = async (candidateId) => {
    if (!isVotingOpen) {
      setMessage("Voting is closed! You cannot vote right now.");
      return;
    }

    if (hasVoted) {
      setMessage("You have already voted!");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      await API.post(`/api/v1/candidates/vote/${candidateId}`);

      setMessage("Vote cast successfully!");

      // 🔥 Sync again with backend (IMPORTANT)
      const res = await API.get("/api/v1/users/profile");
      setProfile(res.data.data);
      setVotedCandidate(res.data.data.votedFor);

    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || "Failed to cast vote");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-r from-blue-500 to-blue-300 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-6">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
          Voter Dashboard
        </h2>

        {message && (
          <p className="text-center mb-4 font-semibold text-black">
            {message}
          </p>
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

                {hasVoted && (
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
          <p className="text-center text-gray-600">
            No candidates available
          </p>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {candidates.map((candidate) => {
              const isDisabled =
                loading || !isVotingOpen || hasVoted;

              const isSelected =
                votedCandidate === candidate._id;

              return (
                <div
                  key={candidate._id}
                  className="border rounded-xl p-4 shadow-md hover:shadow-lg transition bg-white"
                >
                  <h3 className="text-lg font-bold">
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
                    disabled={isDisabled}
                    className={`w-full mt-4 py-2 rounded-lg text-white ${
                      !isVotingOpen
                        ? "bg-gray-400 cursor-not-allowed"
                        : isSelected
                        ? "bg-green-600 cursor-not-allowed"
                        : hasVoted
                        ? "bg-gray-500 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
                    }`}
                  >
                    {!isVotingOpen
                      ? "Voting Closed"
                      : isSelected
                      ? "Your Vote"
                      : hasVoted
                      ? "Already Voted"
                      : loading
                      ? "Voting..."
                      : "Vote"}
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default VoterDashboard;