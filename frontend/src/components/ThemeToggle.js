import React, { useEffect, useState } from "react";

function ThemeToggle() {
  // Initialize state based on localStorage immediately
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");

  useEffect(() => {
    // Sync the body class with the state on initial load
    if (theme === "light") {
      document.body.classList.add("light");
    } else {
      document.body.classList.remove("light");
    }
  }, [theme]);

  function toggleTheme() {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  }

  return (
    <button id="themeToggle" className="mode" onClick={toggleTheme}>
      {/* If current theme is light, show Moon to switch to dark. 
          If current is dark, show Sun to switch to light. */}
      {theme === "light" ? "🌙" : "☀️"}
    </button>
  );
}

export default ThemeToggle;
