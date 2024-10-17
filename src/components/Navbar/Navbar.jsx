import "./navbar.css";
import logo from "../../assets/logo.png";
import menu from "../../assets/menu.svg";

import { useContext, useEffect, useState } from "react";
import { CoinContext } from "../../context/CoinContext";
import { Link } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth, signOut } from "../../config/firebase";

const Navbar = () => {
  const { setCurrency } = useContext(CoinContext);
  const [showMenu, setShowMenu] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, redirect or handle user state
        setIsAuthenticated(true);
      } else {
        // User is signed out
        setIsAuthenticated(false);
      }
    });

    // Cleanup listener on component unmount
    return () => unsubscribe();
  }, []);

  const currencyHandler = (event) => {
    switch (event.target.value) {
      case "usd": {
        setCurrency({ name: "usd", symbol: "$" });
        break;
      }
      case "eur": {
        setCurrency({ name: "eur", symbol: "€" });
        break;
      }
      case "bdt": {
        setCurrency({ name: "bdt", symbol: "৳" });
        break;
      }
      default: {
        setCurrency({ name: "usd", symbol: "$" });
        break;
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("User signed out successfully");
      // Optional: Redirect the user to the login page after logout
      window.location.href = "/login";
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <div className="navbar">
      <Link to={`/`}>
        <img src={logo} alt="Logo" className="logo" />
      </Link>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/feature">Explore</Link>
        </li>
        {isAuthenticated && <li onClick={handleLogout}>Logout</li>}
      </ul>

      <div className="nav-right">
        <select onChange={currencyHandler}>
          <option value="usd">USD</option>
          <option value="eur">EUR</option>
          <option value="bdt">BDT</option>
        </select>

        <button className="menu-btn" onClick={() => setShowMenu(!showMenu)}>
          <img src={menu} alt="menu" />
        </button>
      </div>
      {showMenu ? (
        <ul className="toggle-menu">
          <div className="container">
            <li onClick={() => setShowMenu(!showMenu)}>
              <Link to="/">Home</Link>
            </li>
            <li onClick={() => setShowMenu(!showMenu)}>
              <Link to="/feature">Explore</Link>
            </li>
            {isAuthenticated && <li onClick={handleLogout}>Logout</li>}
          </div>
        </ul>
      ) : null}
    </div>
  );
};

export default Navbar;
