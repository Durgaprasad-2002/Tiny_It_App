import React, { useState } from "react";
import "./index.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Register() {
  let navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      axios
        .post("https://tinyit-sgzi.onrender.com/api/user/register", {
          username: formData.username,
          email: formData.email,
          password: formData.password,
        })
        .then((data) => {
          console.log(data.data);
          navigate("/login", {});
        })
        .catch((err) => {
          console.log("error:", err);
          alert("Failed to Register");
        });
    } catch (error) {
      console.error("Registration failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <form className="form" onSubmit={handleSubmit}>
        <h2 className="title-login">TinyIt</h2>
        <input
          type="text"
          name="username"
          className="input-field"
          required
          placeholder="User Name"
          value={formData.username}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          className="input-field"
          required
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          className="input-field password"
          required
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>

        <p className="login-description">
          Already have Account?{" "}
          <Link to="/login" style={{ color: "black" }}>
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
