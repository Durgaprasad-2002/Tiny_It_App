import React, { useState, useEffect } from "react";
import NavBar from "./NavBar";
import "./index.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function Home() {
  const [user, setuser] = useState(null);
  const [longUrl, setLongUrl] = useState("");
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [shortId, setShortId] = useState("");

  let navigate = useNavigate();

  useEffect(() => {
    const localStorageUser = JSON.parse(localStorage.getItem("user"));
    if (localStorageUser) {
      setuser(localStorageUser);
    }
  }, []);

  const handleUrlChange = (event) => {
    setLongUrl(event.target.value);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleShortenUrl = (e) => {
    e.preventDefault();
    if (!user || !user.username) {
      navigate("/login");
      return;
    }
    if (!longUrl || !title) {
      alert("Enter Required Fields");
      return;
    }

    setLoading(true);

    axios
      .post("https://tinyit-sgzi.onrender.com/api/url/shorten", {
        longUrl: longUrl,
        title: title,
        userId: user._id,
      })
      .then((response) => {
        console.log(response.data);
        setShortId(response.data.shortUrl);
        setLoading(false);
      })
      .catch((error) => {
        alert("Failed to create");
        console.error("Error shortening URL:", error);
        setLoading(false);
      });
  };

  return (
    <>
      <>
        <NavBar />
        <div className="Search-box-Container">
          <h3 className="intro-title">
            Welcome to TinyIt, Simplify Your URLs!
          </h3>
          <p className="intro-text">
            TinyIt makes long URLs short and easy to share. Just enter your long
            URL below and click 'Shorten' to get started!
          </p>
          <div className="search-box">
            <form>
              <div className="inner-search-box">
                <input
                  type="url"
                  className="longId"
                  placeholder="Enter your long URL..."
                  value={longUrl}
                  onChange={handleUrlChange}
                  required
                />
                <input
                  type="text"
                  className="longId"
                  placeholder="Title"
                  value={title}
                  onChange={handleTitleChange}
                  required
                />
              </div>

              <button
                className="btn-shortId"
                type="submit"
                onClick={handleShortenUrl}
              >
                {loading ? "Shortening..." : "Shorten"}
              </button>
            </form>
          </div>
          {shortId != "" && (
            <>
              {" "}
              <p className="intro-text">
                Your shorten URL,{" "}
                <Link
                  to={`https://tinyit-sgzi.onrender.com/api/url/${shortId}`}
                  target="new"
                >
                  https://tinyit-sgzi.onrender.com/api/url/{shortId}
                </Link>
              </p>
            </>
          )}
        </div>
      </>
    </>
  );
}
