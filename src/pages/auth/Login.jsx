import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    identifier: "", // username OR email
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // send as username if no '@' in input, otherwise as email
      const payload = formData.identifier.includes("@")
        ? { email: formData.identifier, password: formData.password }
        : { username: formData.identifier, password: formData.password };

      const res = await axios.post("/api/v1/users/login", payload, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      if (res.data?.data?.accessToken) {
        localStorage.setItem("token", res.data.data.accessToken);
        localStorage.setItem("role", res.data.data.user.role);
      }

      if (res.data?.data?.user?.role === "admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/voter-dashboard");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center h-[542px] bg-gradient-to-r from-blue-500 to-blue-300">
      <div className="bg-white shadow-lg rounded-2xl p-6 w-96 m-2">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            name="identifier"
            placeholder="Email or Username"
            value={formData.identifier}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-3 py-2"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-3 py-2"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
          >
            Login
          </button>
        </form>

         <p className="text-sm text-center mt-4 font-semibold">
          Don’t have an account?{" "}
          <button
            type="button"
            onClick={() => navigate("/register")}
            className="text-blue-600 hover:underline"
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
