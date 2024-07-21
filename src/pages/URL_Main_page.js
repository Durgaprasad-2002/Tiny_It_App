import React, { useState, useEffect } from "react";
import NavBar from "./NavBar";
import "./index.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Footer from "./Footer";

export default function URL_Main_page() {
  const [user, setuser] = useState(null);
  const [longUrl, setLongUrl] = useState("");
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [shortId, setShortId] = useState("");

  let navigate = useNavigate();

  useEffect(() => {
    const sessionStorageUser = JSON.parse(sessionStorage.getItem("user"));
    if (sessionStorageUser) {
      setuser(sessionStorageUser);
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
      <NavBar />
      <div className="outer-main">
        <div className="body-outer">
          <div className="">
            <h3 className="intro-title-2">
              Transform Long Links into Short, Shareable URLs
            </h3>
            <p>
              Use TinyIt to quickly and easily convert your long URLs into
              short, manageable links. Simply paste your long URL into the input
              field, add an optional title for easy identification, and click
              the "Shorten" button to generate your new TinyIt link. Enjoy a
              user-friendly experience, custom titles, instant results, and all
              for free!
            </p>
          </div>
          <br />
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
                  to={`https://tinyit-sgzi.onrender.com/${shortId}`}
                  target="new"
                >
                  tinyit-sgzi.onrender.com/{shortId}
                </Link>
              </p>
            </>
          )}
        </div>
      </div>
    </>
  );
}
