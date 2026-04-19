import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SplashPage.css";
import logo from "../assets/logo.webp";

function SplashPage() {
  const [dotCount, setDotCount] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const dotInterval = setInterval(() => {
      setDotCount((prev) => (prev + 1) % 4);
    }, 500);
    return () => clearInterval(dotInterval);
  }, []);

  useEffect(() => {
    const fadeTimeout = setTimeout(() => {
      setFadeOut(true);
      const navTimeout = setTimeout(() => {
        navigate("/home");
      }, 500);
      return () => clearTimeout(navTimeout);
    }, 3000);

    return () => clearTimeout(fadeTimeout);
  }, [navigate]);

  return (
    <div className="splash-body">
      <div className={`loader-container ${fadeOut ? "fade-out" : ""}`}>
        <div className="logo">
          <img src={logo} id="logo" alt="Logo" />
        </div>
        {/* Fixed typo from 'Twis' to 'Twist' */}
        <h1>Twist & Turn</h1>
        <div className="spinner"></div>
        <div className="loading-text">
          Loading<span className="dots">{".".repeat(dotCount)}</span>
        </div>
      </div>
    </div>
  );
}

export default SplashPage;