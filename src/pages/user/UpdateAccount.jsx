import { useState, useEffect } from "react";
import API from "../../API";

const UpdateAccount = ({ profile, setProfile }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    cnicNumber: "",
    age: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (profile) {
      setFormData({
        fullName: profile.fullName || "",
        username: profile.username || "",
        email: profile.email || "",
        cnicNumber: profile.cnicNumber || "",
        age: profile.age || "",
      });
    }
  }, [profile]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const res = await API.patch("/api/v1/users/update-account-details", formData);
      setMessage(res.data.message || "Account updated successfully!");
      // Update the profile in parent component
      setProfile((prev) => ({ ...prev, ...formData }));
    } catch (err) {
      console.error("Update API error:", err.response || err);
      setMessage(err.response?.data?.message || "Update failed, try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <h2 className="text-xl font-bold mb-4 text-center">Update Account</h2>

      {["fullName", "username", "email", "cnicNumber", "age"].map((field) => (
        <input
          key={field}
          type={field === "email" ? "email" : field === "age" ? "number" : "text"}
          name={field}
          placeholder={field === "cnicNumber" ? "CNIC Number" : field.charAt(0).toUpperCase() + field.slice(1)}
          value={formData[field]}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      ))}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700 disabled:bg-gray-400"
      >
        {loading ? "Updating..." : "Update Account"}
      </button>

      {message && (
        <p className="mt-2 text-center text-sm text-gray-700">{message}</p>
      )}
    </form>
  );
};

export default UpdateAccount;
