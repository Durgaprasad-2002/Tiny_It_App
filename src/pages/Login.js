import React, { useState } from "react";
import "./index.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Register() {
  let navigate = useNavigate();

  const [formData, setFormData] = useState({
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
    setLoading((prev) => true);

    axios
      .post("https://tinyit-sgzi.onrender.com/api/user/login", {
        email: formData.email,
        password: formData.password,
      })
      .then((data) => {
        sessionStorage.setItem("token", JSON.stringify(data.data.token));
        sessionStorage.setItem("user", JSON.stringify(data.data.user));
        setTimeout(() => {
          sessionStorage.clear();
        }, 3600000);
        navigate("/", {});

        setLoading((prev) => false);
      })
      .catch((err) => {
        console.log("error:", err);
        alert("Failed to Login");
        setLoading((prev) => false);
      });
  };

  return (
    <div className="container">
      <form className="form" onSubmit={handleSubmit}>
        <h2 className="title-login">TinyIt</h2>

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
          {loading == true ? "Verifying User..." : "Login"}
        </button>

        <p className="login-description">
          Don't have Account?{" "}
          <Link to="/register" style={{ color: "black" }}>
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}
