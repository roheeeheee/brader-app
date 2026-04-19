import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo.webp";
import ThemeToggle from "./ThemeToggle";

function Header() {
  const location = useLocation();

  // This is the ONLY place that should decide to hide the header
  if (location.pathname === "/") {
    return null;
  }

  return (
    <header className="header">
      <nav className="horizontal-nav">
        <img src={logo} id="logo" alt="Logo" />
        <ul>
          <li><Link to="/home">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          <li><Link to="/register">Register</Link></li>
         <li><Link to="/login">Login</Link></li>
        </ul>
        <ThemeToggle />
      </nav>
    </header>
  );
}

export default Header;
