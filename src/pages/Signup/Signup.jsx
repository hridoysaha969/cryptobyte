// src/pages/Signup.jsx
import { useState } from "react";
import {
  auth,
  provider,
  signInWithPopup,
  createUserWithEmailAndPassword,
} from "../../config/firebase";
import "./signup.css";
import { Link } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Handle Google Sign In
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("User Info:", user);
    } catch (error) {
      console.error("Error during Google sign-in:", error);
      setError("Google sign-in failed.");
    }
  };

  // Handle Email/Password Signup
  const handleSignup = async (e) => {
    e.preventDefault();
    setError(""); // Reset error

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log("User signed up:", user);
    } catch (error) {
      console.error("Error during signup:", error);
      setError("Email/password signup failed.");
    }
  };

  return (
    <section className="signup-section">
      <div className="signup-container">
        <h2>Create an Account</h2>

        {/* Google Sign-In */}
        <button className="google-btn" onClick={handleGoogleSignIn}>
          Sign Up with Google
        </button>

        <p className="devider">or</p>

        {/* Email/Password Signup */}
        <form onSubmit={handleSignup} className="signup-form">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="signup-btn">
            Sign Up
          </button>
          <p className="switch-wrapper">
            Have an account? <Link to="/login">Login</Link>
          </p>
        </form>

        {/* Error Message */}
        {error && <p className="error">{error}</p>}
      </div>
    </section>
  );
};

export default Signup;
