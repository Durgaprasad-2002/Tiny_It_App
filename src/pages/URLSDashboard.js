import React, { useState, useEffect, useCallback } from "react";
import "./index.css";
import NavBar from "./NavBar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function URLSDashboard() {
  let navigate = useNavigate();
  const [user, setUser] = useState();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalClicks, setTotalClicks] = useState(0);

  function CountClicks(data) {
    let count = 0;
    data.forEach((e) => (count += e.clicks));
    setTotalClicks(count);
  }

  const fetchURLS = useCallback(async (userId) => {
    console.log("user Id:", userId);
    try {
      const response = await axios.get(
        `https://tinyit-sgzi.onrender.com/api/url/urlsInfo/${userId}`
      );
      console.log(response.data);
      setData(response.data);
      CountClicks(response.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    const localStorageUser = JSON.parse(localStorage.getItem("user"));

    if (localStorageUser) {
      setUser(localStorageUser);
      console.log(localStorageUser);
      fetchURLS(localStorageUser?._id);
    }
    if (!user || !user.username) {
      navigate("/login");
      return;
    }
  }, [fetchURLS]);

  return (
    <>
      <NavBar />
      <div className="outer-body">
        <div className="outer-dash-2">
          <h2 className="username-text">Welcome, {user?.username}</h2>

          <div className="total-count-conatiner">
            <div className="inner-total-count-conatiner">
              <h4>Live Links : {data.length || 0}</h4>
            </div>
            <div className="inner-total-count-conatiner">
              <h4>Total Clicks : {totalClicks}</h4>
            </div>
          </div>
        </div>

        {data.length === 0 ? (
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
                <h5>Clicks : {ele.clicks}</h5>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
