import React, { useState, useEffect, useCallback } from "react";
import "./index.css";
import NavBar from "./NavBar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const URLSDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalClicks, setTotalClicks] = useState(0);

  const fetchURLS = useCallback(async (userId) => {
    try {
      const response = await axios.get(
        `https://tinyit-sgzi.onrender.com/api/url/urlsInfo/${userId}`
      );

      setData(response.data);
      CountClicks(response.data);
    } catch (error) {
      console.error("Error fetching URLs:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const localStorageUser = JSON.parse(localStorage.getItem("user"));
    if (!localStorageUser || !localStorageUser.username) {
      navigate("/login");
      return;
    }

    if (localStorageUser) {
      setUser(localStorageUser);
      fetchURLS(localStorageUser._id);
    }
  }, [fetchURLS, navigate]);

  const CountClicks = (data) => {
    let count = 0;
    data.forEach((e) => (count += e.clicks));
    setTotalClicks(count);
  };

  return (
    <>
      <NavBar />
      <div className="outer-body">
        <div className="outer-dash-2">
          <h2 className="username-text">Welcome, {user?.username}</h2>

          <div className="total-count-conatiner">
            <div className="inner-total-count-conatiner">
              <h4>Live Links: {data.length || 0}</h4>
            </div>
            <div className="inner-total-count-conatiner">
              <h4>Total Clicks: {totalClicks}</h4>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="loading-container">
            <p>Loading...</p>
          </div>
        ) : data.length === 0 ? (
          <div className="no-URLS-Added-outer">
            <p className="no-urls-text">
              You haven't shortened any URLs yet, Do it Now
            </p>
          </div>
        ) : (
          <div className="container-urls">
            {data.map((ele, ind) => (
              <div
                key={ind}
                className="url-ele-card"
                onClick={() => navigate(`/analytic/:${ele.shortUrl}`)}
              >
                <h4>{ele.title}</h4>
                <h5>Clicks: {ele.clicks}</h5>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default URLSDashboard;
