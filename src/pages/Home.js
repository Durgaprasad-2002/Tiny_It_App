import React, { useState, useEffect } from "react";
import NavBar from "./NavBar";
import "./index.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import Image from "../Images/Image.jpeg";

export default function Home() {
  return (
    <>
      <>
        <NavBar />
        <div className="outer-main">
          <div className="Search-box-Container">
            <h2 className="intro-title">
              Welcome to TinyIt, Simplify Your URLs!
            </h2>

            <p className="intro-text">
              TinyIt is your go-to solution for transforming long, unwieldy URLs
              into concise, shareable links. Whether you're managing social
              media campaigns, sharing resources, or simply need a cleaner way
              to present links, TinyIt has you covered.
            </p>
            <Link to="/shorten">
              {" "}
              <button className="get-started">Get Started</button>
            </Link>

            <img src={Image} className="cover-img" />
          </div>
        </div>
      </>
      <Footer />
    </>
  );
}
