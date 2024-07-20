import React, { useState, useEffect } from "react";
import { useParams, useLocation, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import NavBar from "./NavBar";
import "./index.css";
import { FaLink } from "react-icons/fa6";

const Analytics = () => {
  const navigate = useNavigate();
  const { shortUrl } = useParams();
  const location = useLocation();
  const [analyticsData, setAnalyticsData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("user"));
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
      setError("Failed to retrieve analytics. Please try again later.");
      console.error("Failed to retrieve analytics:", error);
    }
  };

  return (
    <>
      <NavBar />
      <div className="outer-main">
        <div className="analytics-container">
          {error && <p className="error">{error}</p>}
          {analyticsData ? (
            <>
              <h2>
                Analytics for{" "}
                <Link
                  to={`https://tinyit-sgzi.onrender.com/api/url/${analyticsData.shortUrl}`}
                  target="_blank"
                >
                  {analyticsData.shortUrl}
                </Link>
              </h2>
              <pre className="analytics-long">
                <FaLink className="link-icon" />{" "}
                <Link to={analyticsData.longUrl} target="_blank">
                  {analyticsData.longUrl}
                </Link>
              </pre>
              <p>
                <b>Total Clicks:</b> {analyticsData.clicks}
              </p>
            </>
          ) : (
            <p>Loading analytics data...</p>
          )}
        </div>
        <div className="analytics-container">
          {error && <p className="error">{error}</p>}
          {analyticsData ? (
            <div>
              <h2 className="click-deatils-title">Click Details</h2>
              <div>
                {analyticsData?.clickDetails.map((data) => {
                  return (
                    <>
                      <div className="click-details-card">
                        <h4>Requested From Domain: {data.referrer}</h4>
                        <p style={{ fontSize: "small" }}>{Date(data.date)}</p>
                      </div>
                    </>
                  );
                })}
              </div>
            </div>
          ) : (
            <p>Loading analytics data...</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Analytics;
