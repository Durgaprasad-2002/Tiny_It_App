import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";
import NavBar from "./NavBar";
import "./index.css";
import { Link } from "react-router-dom";
import { FaLink } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const Analytics = () => {
  const navigate = useNavigate();
  const { shortUrl } = useParams();
  const location = useLocation();
  const [analyticsData, setAnalyticsData] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || !user.username) {
      navigate("/login");
      return;
    }
    fetchAnalyticsData();
  }, [location.state]);

  const fetchAnalyticsData = async () => {
    try {
      const response = await axios.get(
        `https://tinyit-sgzi.onrender.com/api/url/analytics/${
          shortUrl?.split(":")[1]
        }`
      );
      setAnalyticsData(response.data);
    } catch (error) {
      console.error("Failed to retrieve analytics:", error);
    }
  };

  return (
    <>
      <NavBar />
      <div className="analytics-container">
        {analyticsData ? (
          <>
            <div>
              <h2>
                Analytics for{" "}
                <Link
                  to={`https://tinyit-sgzi.onrender.com/api/url/${analyticsData.shortUrl}`}
                  target="new"
                >
                  {analyticsData.shortUrl}
                </Link>
              </h2>
              <p style={{ verticalAlign: "center" }}>
                {" "}
                <FaLink className="link-icon" />{" "}
                <Link to={analyticsData.longUrl} target="new">
                  {analyticsData.longUrl}
                </Link>{" "}
              </p>
              <p>
                {" "}
                <b>Total Clicks:</b> {analyticsData.clicks}
              </p>
            </div>
            {/* <div>{analyticsData
}</div> */}
          </>
        ) : (
          <p>Loading analytics data...</p>
        )}
      </div>
    </>
  );
};

export default Analytics;
