import "./navbar.css";
import logo from "../../assets/logo.png";
import menu from "../../assets/menu.svg";

import { useContext } from "react";
import { CoinContext } from "../../context/CoinContext";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { setCurrency } = useContext(CoinContext);

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
      </ul>

      <div className="nav-right">
        <select onChange={currencyHandler}>
          <option value="usd">USD</option>
          <option value="eur">EUR</option>
          <option value="bdt">BDT</option>
        </select>

        <button className="menu-btn">
          <img src={menu} alt="menu" />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
