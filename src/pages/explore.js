import React, { useContext, useEffect, useState } from "react";
import TokenList from "../../components/TokenList";
import { Alert } from "flowbite-react";
import TokenContext from "../../context/tokenContext";
import UserContext from "../../context/userContext";

const Explore = () => {
  const tokensArr = [
    {
      id: "bitcoin",
      symbol: "btc",
      name: "Bitcoin",
      image:
        "https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579",
      current_price: 28333,
      market_cap: 547173442617,
      market_cap_rank: 1,
      fully_diluted_valuation: 594339611548,
      total_volume: 20011873269,
      high_24h: 28636,
      low_24h: 27626,
      price_change_24h: 436.78,
      price_change_percentage_24h: 1.56574,
      market_cap_change_24h: 8686174989,
      market_cap_change_percentage_24h: 1.61307,
      circulating_supply: 19333462,
      total_supply: 21000000,
      max_supply: 21000000,
      ath: 69045,
      ath_change_percentage: -58.96498,
      ath_date: "2021-11-10T14:24:11.849Z",
      atl: 67.81,
      atl_change_percentage: 41682.85214,
      atl_date: "2013-07-06T00:00:00.000Z",
      roi: null,
      last_updated: "2023-03-31T18:28:31.064Z",
      iswatchlisted: false,
    },
    {
      id: "ethereum",
      symbol: "eth",
      name: "Ethereum",
      image:
        "https://assets.coingecko.com/coins/images/279/large/ethereum.png?1595348880",
      current_price: 1824.89,
      market_cap: 219596062029,
      market_cap_rank: 2,
      fully_diluted_valuation: 219596062029,
      total_volume: 10344549425,
      high_24h: 1844.77,
      low_24h: 1774.19,
      price_change_24h: 50.7,
      price_change_percentage_24h: 2.85744,
      market_cap_change_24h: 5981740103,
      market_cap_change_percentage_24h: 2.80025,
      circulating_supply: 120447240.701977,
      total_supply: 120447240.701977,
      max_supply: null,
      ath: 4878.26,
      ath_change_percentage: -62.58838,
      ath_date: "2021-11-10T14:24:19.604Z",
      atl: 0.432979,
      atl_change_percentage: 421407.02018,
      atl_date: "2015-10-20T00:00:00.000Z",
      roi: {
        times: 85.17362368307533,
        currency: "btc",
        percentage: 8517.362368307535,
      },
      last_updated: "2023-03-31T18:28:32.200Z",
      iswatchlisted: false,
    },
    {
      id: "tether",
      symbol: "usdt",
      name: "Tether",
      image:
        "https://assets.coingecko.com/coins/images/325/large/Tether.png?1668148663",
      current_price: 1.001,
      market_cap: 79692418868,
      market_cap_rank: 3,
      fully_diluted_valuation: 79692418868,
      total_volume: 31336027651,
      high_24h: 1.006,
      low_24h: 0.997919,
      price_change_24h: -0.000377822160839703,
      price_change_percentage_24h: -0.03774,
      market_cap_change_24h: -30399534.570846558,
      market_cap_change_percentage_24h: -0.03813,
      circulating_supply: 79672364928.7135,
      total_supply: 79672364928.7135,
      max_supply: null,
      ath: 1.32,
      ath_change_percentage: -24.40063,
      ath_date: "2018-07-24T00:00:00.000Z",
      atl: 0.572521,
      atl_change_percentage: 74.71005,
      atl_date: "2015-03-02T00:00:00.000Z",
      roi: null,
      last_updated: "2023-03-31T18:25:01.719Z",
      iswatchlisted: false,
    },
    {
      id: "binancecoin",
      symbol: "bnb",
      name: "BNB",
      image:
        "https://assets.coingecko.com/coins/images/825/large/bnb-icon2_2x.png?1644979850",
      current_price: 316.98,
      market_cap: 49999921378,
      market_cap_rank: 4,
      fully_diluted_valuation: 63333034331,
      total_volume: 558062873,
      high_24h: 319.68,
      low_24h: 313.26,
      price_change_24h: 2.33,
      price_change_percentage_24h: 0.74208,
      market_cap_change_24h: 402917268,
      market_cap_change_percentage_24h: 0.81238,
      circulating_supply: 157895234,
      total_supply: 157900174,
      max_supply: 200000000,
      ath: 686.31,
      ath_change_percentage: -53.86212,
      ath_date: "2021-05-10T07:24:17.097Z",
      atl: 0.0398177,
      atl_change_percentage: 795142.69198,
      atl_date: "2017-10-19T00:00:00.000Z",
      roi: null,
      last_updated: "2023-03-31T18:28:37.407Z",
      iswatchlisted: false,
    },
    {
      id: "usd-coin",
      symbol: "usdc",
      name: "USD Coin",
      image:
        "https://assets.coingecko.com/coins/images/6319/large/USD_Coin_icon.png?1547042389",
      current_price: 1.001,
      market_cap: 32492109166,
      market_cap_rank: 5,
      fully_diluted_valuation: 32502224936,
      total_volume: 4326159895,
      high_24h: 1.004,
      low_24h: 0.998396,
      price_change_24h: -0.00021424141560944,
      price_change_percentage_24h: -0.0214,
      market_cap_change_24h: -348630249.002491,
      market_cap_change_percentage_24h: -1.06158,
      circulating_supply: 32506491100.5113,
      total_supply: 32516611348.1513,
      max_supply: null,
      ath: 1.17,
      ath_change_percentage: -14.74943,
      ath_date: "2019-05-08T00:40:28.300Z",
      atl: 0.877647,
      atl_change_percentage: 13.9113,
      atl_date: "2023-03-11T08:02:13.981Z",
      roi: null,
      last_updated: "2023-03-31T18:28:32.490Z",
      iswatchlisted: false,
    },
    {
      id: "ripple",
      symbol: "xrp",
      name: "XRP",
      image:
        "https://assets.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png?1605778731",
      current_price: 0.534991,
      market_cap: 27587350685,
      market_cap_rank: 6,
      fully_diluted_valuation: 53382968513,
      total_volume: 2029953631,
      high_24h: 0.54833,
      low_24h: 0.529871,
      price_change_24h: -0.001583450280660759,
      price_change_percentage_24h: -0.2951,
      market_cap_change_24h: -172081824.6603508,
      market_cap_change_percentage_24h: -0.6199,
      circulating_supply: 51678187732,
      total_supply: 99989057196,
      max_supply: 100000000000,
      ath: 3.4,
      ath_change_percentage: -84.27739,
      ath_date: "2018-01-07T00:00:00.000Z",
      atl: 0.00268621,
      atl_change_percentage: 19791.42841,
      atl_date: "2014-05-22T00:00:00.000Z",
      roi: null,
      last_updated: "2023-03-31T18:28:29.938Z",
      iswatchlisted: false,
    },
  ];

  const { userData, setUserData, authToken } = useContext(UserContext);

  const [tokens, setTokens] = useState([]);

  const [allTokens, setAllTokens] = useState(true);

  const watchlistBtn = () => {
    setAllTokens(!allTokens);
  };

  const fetchTokens = async () => {
    // const response = await fetch(
    //   "http://localhost:5000/api/exchange/fetchalltokens",
    //   {
    //     method: "GET",
    //     headers: {
    //       "Content-Type": "application/json",
    //       "auth-token": localStorage.getItem("token"),
    //     },
    //   }
    // );
    // const data = await response.json();
    setTokens(tokensArr);
    // if (data.status.error_code && data.status.error_code=== 429) {
    //   setTokens({
    //     error_message: "Out of API credit limit😪😪. Try again after a while",
    //   });
    // } else {
    //   setTokens(data);
    // }
  };

  useEffect(() => {
    fetchTokens();
    console.log("------fetchTokens useEffect in explore page-------");
  }, []);


  let justBtn = "px-5 py-2 rounded-full font-medium text-sm focus:outline-none text-center";

  let selectedBtnClass =
    justBtn + " text-lime-100 mr-2 border border-lime-100";

  let unselectedBtnClass =
    justBtn + " text-zinc-600 hover:text-zinc-200 mr-2";

  return (
    <TokenContext.Provider value={{ tokens, setTokens }}>
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 my-4">
        {userData &&
          (allTokens ? (
            <div className="">
              <button type="button" className={selectedBtnClass}>
                All coins
              </button>

              <button
                type="button"
                className={`${unselectedBtnClass} inline-flex`}
                onClick={watchlistBtn}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="w-4 h-4 mr-2 -ml-1" viewBox="0 0 16 16">
                  <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"/>
              </svg> 
                WatchListed
              </button>
            </div>
          ) : (
            <div className="">
              <button
                type="button"
                className={unselectedBtnClass}
                onClick={watchlistBtn}
              >
                All coins
              </button>

              <button type="button" className={`${selectedBtnClass} inline-flex`}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="w-4 h-4 mr-2 -ml-1" viewBox="0 0 16 16">
                  <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"/>
              </svg> 
                WatchListed
              </button>
            </div>
          ))}
      </div>

      {tokens.error_message ? (
        <p>{error_message}</p>
      ) : (
        <TokenList
          tokenList={allTokens ? tokens : tokens.filter((t) => t.iswatchlisted)}
          watchlisted={!allTokens}
        />
      )}
    </TokenContext.Provider>
  );
};

export default Explore;
