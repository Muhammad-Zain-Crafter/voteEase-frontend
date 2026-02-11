import { useEffect, useState } from "react";
import axios from "axios";
import { UserCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import UpdateAccount from "./UpdateAccount";
import ChangePassword from "./ChangePassword";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [message, setMessage] = useState("");
  const [activeTab, setActiveTab] = useState("info"); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("/api/v1/users/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfile(res.data.data);
      } catch (err) {
        console.error(err);
        setMessage(err.response?.data?.message || "Failed to load profile");
      }
    };
    fetchProfile();
  }, []);

  const goToDashboard = () => {
    if (profile.role === "admin") {
      navigate("/admin-dashboard");
    } else {
      navigate("/voter-dashboard");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-teal-500 to-blue-400 p-6">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-2xl">
        {message && <p className="text-red-600">{message}</p>}

        {/* Tabs */}
        <div className="flex justify-center mb-6 space-x-4">
          <button
            onClick={() => setActiveTab("info")}
            className={`px-4 py-2 rounded-lg ${
              activeTab === "info"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Profile Info
          </button>
          <button
            onClick={() => setActiveTab("update")}
            className={`px-4 py-2 rounded-lg ${
              activeTab === "update"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Update Account
          </button>
          <button
            onClick={() => setActiveTab("password")}
            className={`px-4 py-2 rounded-lg ${
              activeTab === "password"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Change Password
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === "info" && (
          <div className="text-center">
            {profile ? (
              <>
                <UserCircle className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-700 mb-2">
                  {profile.username}
                </h2>
                <p className="text-gray-600">{profile.fullName}</p>
                <p className="text-gray-600">{profile.email}</p>
                <p className="capitalize text-gray-600 mb-4">
                  Role: {profile.role}
                </p>

                <button
                  onClick={goToDashboard}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  Go to {profile.role === "admin" ? "Admin" : "Voter"} Dashboard
                </button>
              </>
            ) : (
              <p className="text-gray-600">Loading profile...</p>
            )}
          </div>
        )}

        {activeTab === "update" && (
          <div>
            <UpdateAccount />
          </div>
        )}

        {activeTab === "password" && (
          <div>
            <ChangePassword />
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
