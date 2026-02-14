import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../API";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    fullName: "",
    password: "",
    cnicNumber: "",
    age: "",
    role: "voter",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // CNIC validation
    if (!/^\d{13}$/.test(formData.cnicNumber)) {
      setError("CNIC must be exactly 13 digits.");
      return;
    }

    // Password validation
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    // Age validation
    if (Number(formData.age) < 18) {
      setError("You must be at least 18 years old to register.");
      return;
    }

    try {
      await API.post("/api/v1/users/register", {
        ...formData,
        age: Number(formData.age),
      });

      navigate("/login");
    } catch (err) {
      if (err.response?.status === 409) {
        setError(
          err.response.data.message ||
          "Username or email already exists"
        );
      } else {
        setError(err.response?.data?.message || "Registration failed");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-linear-to-r from-blue-500 to-blue-300">
      <div className="bg-white shadow-lg rounded-2xl p-6 w-96 m-8">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-3 py-2"
          />

          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-3 py-2"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-3 py-2"
          />

          <input
            type="password"
            name="password"
            placeholder="Password (min 6 characters)"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-3 py-2"
          />

          <input
            type="text"
            name="cnicNumber"
            placeholder="CNIC Number (13 digits)"
            value={formData.cnicNumber}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, "");
              setFormData({ ...formData, cnicNumber: value });
            }}
            maxLength={13}
            required
            className="w-full border rounded-lg px-3 py-2"
          />

          <input
            type="number"
            name="age"
            placeholder="Age"
            value={formData.age}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-3 py-2"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Register
          </button>
        </form>

        <p className="text-sm text-center mt-4 font-semibold">
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="text-blue-600 hover:underline"
          >
            Sign in
          </button>
        </p>
      </div>
    </div>
  );
};

export default Register;
