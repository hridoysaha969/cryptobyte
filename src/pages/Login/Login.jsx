// src/pages/Login.jsx
import { useState } from "react";
import {
  auth,
  provider,
  signInWithPopup,
  signInWithEmailAndPassword,
} from "../../config/firebase";
import "./login.css";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Handle Google Sign-In
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

  // Handle Email/Password Login
  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Reset error

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log("User logged in:", user);
    } catch (error) {
      console.error("Error during login:", error);
      setError("Email/password login failed.");
    }
  };

  return (
    <section className="signup-section">
      <div className="login-container">
        <h2>Login to Your Account</h2>

        {/* Google Sign-In */}
        <button className="google-btn" onClick={handleGoogleSignIn}>
          Log In with Google
        </button>

        <p className="devider">or</p>

        {/* Email/Password Login */}
        <form onSubmit={handleLogin} className="login-form">
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
          <button type="submit" className="login-btn">
            Log In
          </button>

          <p className="switch-wrapper">
            {"Don't"} have an account? <Link to="/signup">Signup</Link>
          </p>
        </form>

        {/* Error Message */}
        {error && <p className="error">{error}</p>}
      </div>
    </section>
  );
};

export default Login;
