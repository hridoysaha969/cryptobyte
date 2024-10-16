import { useContext, useEffect, useState } from "react";
import "./home.css";
import { CoinContext } from "../../context/CoinContext";
import { Link } from "react-router-dom";
import arrow from "../../assets/arrow_icon.png";

const Home = () => {
  const { allCoin, currency } = useContext(CoinContext);
  const [displayCoin, setDisplayCoin] = useState([]);
  const [input, setInput] = useState("");

  const handleInput = (e) => {
    setInput(e.target.value);
    if (e.target.value === "") {
      setDisplayCoin(allCoin);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const coins = await allCoin.filter((item) => {
      return item.name.toLowerCase().includes(input.toLowerCase());
    });

    setDisplayCoin(coins);
  };

  useEffect(() => {
    setDisplayCoin(allCoin);
  }, [allCoin]);

  return (
    <div className="home">
      <div className="container">
        <div className="banner">
          <div>
            <h1>Discover Top 5 Trending Cryptocurrencies</h1>
            <p>
              Get real-time updates on the {"market's"} top 5 cryptocurrencies.
              Stay informed with the most important details like market cap,
              price changes, and trends — all at a glance. For full access to
              over 100+ cryptocurrencies and in-depth insights, sign up today!
            </p>
            <p className="cta-wrapper">
              <button className="call-to-action">
                Signup
                <img src={arrow} alt="Signup arrow" />
              </button>
              for Full Market Access
            </p>
          </div>
          <div>
            <img src="/crypto.png" />
          </div>
        </div>
      </div>

      <div className="hero">
        <h1>
          Largest <br /> Crypto Marketplace
        </h1>
        <p>
          Welcome to the {"world's"} largest cryptocurrency marketplace. Sign up
          to explore more about cryptos.
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Search Crypto..."
            onChange={handleInput}
            list="coinlist"
            value={input}
            required
          />

          <datalist id="coinlist">
            {allCoin &&
              allCoin.map((item, ind) => (
                <option key={ind} value={item.name} />
              ))}
          </datalist>

          <button type="submit" className="search">
            Search
          </button>
        </form>
      </div>

      <div className="crypto-table">
        <div className="table-layout">
          <p>#</p>
          <p>Coins</p>
          <p>Price</p>
          <p style={{ textAlign: "center" }}>24H Change</p>
          <p className="market-cap">Market Cap</p>
        </div>

        {displayCoin.slice(0, 5).map((item, ind) => (
          <Link to={`/coin/${item.id}`} key={ind} className="table-layout">
            <p>{item.market_cap_rank}</p>
            <div>
              <img src={item.image} alt="" />
              <p>{`${item.name} - ${item.symbol}`}</p>
            </div>
            <p>
              {currency.symbol} {item.current_price.toLocaleString()}
            </p>
            <p
              className={item.price_change_percentage_24h > 0 ? "green" : "red"}
            >
              {Math.floor(item.price_change_percentage_24h * 100) / 100}
            </p>
            <p className="market-cap">
              {currency.symbol} {item.market_cap.toLocaleString()}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
