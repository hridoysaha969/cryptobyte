import { useContext, useEffect, useState } from "react";
import "../Home/home.css";
import { CoinContext } from "../../context/CoinContext";
import { Link } from "react-router-dom";

const Feature = () => {
  const { allCoin, currency } = useContext(CoinContext);
  const [displayCoin, setDisplayCoin] = useState([]);
  const [input, setInput] = useState("");
  const [pageCount, setPageCount] = useState({
    start: 0,
    slice: 10,
  });

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

  const handlePrev = () => {
    if (pageCount.start >= 10 && pageCount.slice >= 20) {
      setPageCount({
        start: pageCount.start - 10,
        slice: pageCount.slice - 10,
      });
    }
  };
  const handleNext = () => {
    if (pageCount.start <= 90 && pageCount.slice <= 100) {
      setPageCount({
        start: pageCount.start + 10,
        slice: pageCount.slice + 10,
      });
    }
  };

  return (
    <div className="home">
      <div className="hero">
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

          <button className="search" type="submit">
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

        {displayCoin
          .slice(pageCount.start, pageCount.slice)
          .map((item, ind) => (
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
                className={
                  item.price_change_percentage_24h > 0 ? "green" : "red"
                }
              >
                {Math.floor(item.price_change_percentage_24h * 100) / 100}
              </p>
              <p className="market-cap">
                {currency.symbol} {item.market_cap.toLocaleString()}
              </p>
            </Link>
          ))}

        <div className="padination_wrapper">
          <button disabled={pageCount.start <= 0} onClick={handlePrev}>
            Prev
          </button>
          <button disabled={pageCount.start >= 90} onClick={handleNext}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Feature;
