import React, { useState } from "react";
import Footer from "../components/Footer";
import map from "../assets/map.jpg";

function ContactPage() {
  // 1. Setup State for inputs
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  // 2. Setup State for error messages
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [messageError, setMessageError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Reset errors every time we click submit
    setNameError("");
    setEmailError("");
    setMessageError("");

    let isValid = true;

    // Validation checks
    if (!name.trim()) {
      setNameError("Name is required!");
      isValid = false;
    }

    if (!email.trim()) {
      setEmailError("Email is required!");
      isValid = false;
    } else if (!email.includes("@")) {
      setEmailError("Invalid email format (missing @).");
      isValid = false;
    }

    if (!message.trim()) {
      setMessageError("Message cannot be empty!");
      isValid = false;
    }

    if (isValid) {
      alert("Form submitted successfully!");
      // Clear fields after success
      setName("");
      setEmail("");
      setMessage("");
    }
  };

  return (
    <div>
      <section className="signup-form">
        <h2>Contact & Resources</h2>

        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name:</label>
            <input 
              type="text" 
              placeholder="Your name" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              /* Adds a red border if there is an error */
              style={{ borderColor: nameError ? "red" : "" }}
            />
            {/* USES YOUR CSS CLASS 'error' */}
            {nameError && <span className="error">{nameError}</span>}
          </div>

          <div>
            <label htmlFor="email">Email:</label>
            <input 
              type="email" 
              placeholder="Your email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ borderColor: emailError ? "red" : "" }}
            />
            {emailError && <span className="error">{emailError}</span>}
          </div>

          <div>
            <label>Message</label>
            <textarea 
              placeholder="Write your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              style={{ borderColor: messageError ? "red" : "" }}
            ></textarea>
            {messageError && <span className="error">{messageError}</span>}
          </div>

          <input type="submit" value="Submit" />
        </form>
      </section>

      {/* Resources Table */}
      <section className="bg-gray">
        <h2>Useful Resources</h2>
        <table>
          <thead>
            <tr>
              <th>Website</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>World Cube Association</td>
              <td className="table">The World Cube Association (WCA) organizes Rubik’s Cube competitions worldwide.</td>
            </tr>
            <tr>
              <td>Rubik’s Official Site</td>
              <td className="table">The official website provides history and beginner guides.</td>
            </tr>
            <tr>
              <td>SpeedSolving</td>
              <td className="table">An online community for sharing algorithms and strategies.</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section className="bg-gray">
        <h2>Location</h2>
        <img src={map} alt="map" />
      </section>

      <Footer />
    </div>
  );
}

export default ContactPage;