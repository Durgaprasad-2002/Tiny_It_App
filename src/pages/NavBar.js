import React from "react";

import "./index.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { IoIosLogOut } from "react-icons/io";

export default function NavBar() {
  const [toggle, settoggle] = useState(false);
  const [user, setuser] = useState();

  let navigate = useNavigate();

  useEffect(() => {
    let sessionStorageUser = JSON.parse(sessionStorage.getItem("user"));
    if (sessionStorageUser) {
      setuser(sessionStorageUser);
    }
  }, []);

  const HandleToggle = () => {
    settoggle((prevtoggle) => !prevtoggle);
  };

  function HandleLogout() {
    sessionStorage.clear();
    navigate("/login");
    setuser({});
  }

  return (
    <>
      <nav className="navbar">
        <div>
          <h2 className="brand-title">
            <Link to="/" style={{ textDecoration: "none" }}>
              TinyIt
            </Link>
          </h2>
        </div>
        <div className="nav-contain-2">
          <button className="Toggle-btn" onClick={HandleToggle}>
            <div
              className="toggle-Inner-div"
              id="toggle-ele-1"
              style={{
                rotate: `${toggle ? "45deg" : "0deg"}`,
                marginTop: `${toggle ? "10px" : "0px"}`,
              }}
            ></div>
            <div
              className="toggle-Inner-div"
              id="toggle-ele-2"
              style={{
                opacity: `${toggle ? "0" : "1"}`,
                marginTop: "-0.5px",
              }}
            ></div>
            <div
              className="toggle-Inner-div"
              id="toggle-ele-3"
              style={{
                rotate: `${toggle ? "-45deg" : "0deg"}`,
                marginTop: `${toggle ? "-15px" : "0px"}`,
              }}
            ></div>
          </button>
        </div>
        <div
          className="outer-Toggle-div"
          style={{ display: `${toggle ? "block" : "none"}` }}
        >
          <div className="Toggle-div-contents">
            <div>
              <h2 className="Toggle-div-title">TinyIt</h2>
              <ul className="nav-lists">
                <Link to="/">
                  {" "}
                  <li>Home</li>
                </Link>
                <Link to="/analytics">
                  {" "}
                  <li>Analytics</li>
                </Link>
                {user?.username != undefined ? (
                  <li>{user?.username}</li>
                ) : (
                  <Link to="/login">
                    <li>Login</li>
                  </Link>
                )}
                <li onClick={HandleLogout}>
                  {user?.username != undefined ? (
                    <>
                      Logout <IoIosLogOut className="link-icon-2" />
                    </>
                  ) : (
                    ""
                  )}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
