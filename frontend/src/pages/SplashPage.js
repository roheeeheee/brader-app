import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SplashPage.css";
import logo from "../assets/logo.webp";

function SplashPage() {
  const [dotCount, setDotCount] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);
  const navigate = useNavigate();

  // Handle the dots animation ("Loading...", "Loading..", etc.)
  useEffect(() => {
    const dotInterval = setInterval(() => {
      setDotCount((prev) => (prev + 1) % 4);
    }, 500);
    return () => clearInterval(dotInterval);
  }, []);

  // Handle the timing and navigation logic
  useEffect(() => {
    // 1. Wait 3 seconds, then trigger the fade-out animation
    const fadeTimeout = setTimeout(() => {
      setFadeOut(true);

      // 2. Wait exactly 500ms (duration of the CSS transition) before switching routes
      const navTimeout = setTimeout(() => {
        navigate("/home");
      }, 500);

      return () => clearTimeout(navTimeout);
    }, 3000);

    return () => clearTimeout(fadeTimeout);
  }, [navigate]);

  return (
    <div className="splash-body">
      {/* The 'fade-out' class is toggled by the state after 3 seconds */}
      <div className={`loader-container ${fadeOut ? "fade-out" : ""}`}>
        <div className="logo">
          <img src={logo} id="logo" alt="Logo" />
        </div>
        <h1>Twis & Turn</h1>
        <div className="spinner"></div>
        <div className="loading-text">
          Loading<span className="dots">{".".repeat(dotCount)}</span>
        </div>
      </div>
    </div>
  );
}

export default SplashPage;
