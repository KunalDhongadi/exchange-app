const express = require("express");
const fetch = require('node-fetch2');
var jwt = require('jsonwebtoken');
var fetchUser = require("../middleware/fetchuser");
const User = require("../models/User");
const Active = require("../models/Active");
const Transactions = require("../models/Transaction");
const Transaction = require("../models/Transaction");
const router = express.Router();


// const { body, validationResult } = require("express-validator");

// Route 1: (Not in use) Get all the tokens from the external API. Login not required. If loggedIn, get watchlisted tokens.
router.get("/fetchalltokens", async (req, res) => {
  let user = null;
  const token =  req.header('auth-token');
  if(token){
    try {
      const data = jwt.verify(token, "kunal");
      user = data.user;
    }catch (error) {
      user = null;
    }
  }
  try {
    const {page} = req.query;
    const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=10&page=${page}&sparkline=false`;
    const response = await fetch(url, {
      header : {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.93 Safari/537.36',
      }
    });
    const tokens = await response.json();

    if(tokens.status && tokens.status.error_code === 429){
      res.json({"status": 429, "message":"Exceeded the limit"})
    }
    else{
      if(user){
        const fetchedUser = await User.findById(user.id);
        tokens.forEach(token => {
            token.iswatchlisted =  fetchedUser.watchlist.includes(token.id);
        });
      }

    res.json(tokens);
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({error: "Some error occured"});
  }
});

// Route 2: Get Watchlisted tokens/coins
router.get("/fetchwatchlisted", fetchUser,  async (req, res) => {
  try {
    const fetchedUser = await User.findById(req.user.id);
    if(fetchedUser.watchlist.length === 0){
      res.json([]);
      return;
    }
    const queryParams = fetchedUser.watchlist.join("%2c%20");
    const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&ids=${queryParams}&sparkline=false`;
    console.log("url-",url);
    const response = await fetch(url, {header : {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.93 Safari/537.36',
    }});
    console.log("response-",response);
    const tokens = await response.json();
    console.log("tokens wtchlisted-",tokens);
    tokens.forEach(token => {
      token.iswatchlisted =  true;
    });
    res.json(tokens);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some error occured");
  }
});

// Route 3: (Not in use) Get specific token details from the external API. Login not required. If loggedIn, check if watchlisted.
router.get("/fetchtoken/:symbol", async (req, res) => {

  let user = null;
  const token =  req.header('auth-token');
  if(token){
    try {
      const data = jwt.verify(token, "kunal");
      user = data.user;
    }catch (error) {
      user = null;
    }
  }

  try {
    const symbol = req.params.symbol;
    const url = `https://api.coingecko.com/api/v3/coins/${symbol}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false`;
    const response = await fetch(url);

    if(response.status === 404){
      const error = await response.json();
      // console.log(error);
      res.status(404).json({"error": error.error});
      return;
    }

    const token = await response.json();


    // console.log("bdabda", token.market_data[0]);

    // Deleting unwanted fields
    delete token.asset_platform_id;
    delete token.platforms;
    delete token.detail_platforms;
    delete token.ico_data;
    delete token.public_interest_stats;

    delete token.links.chat_url;
    delete token.links.announcement_url;
    delete token.links.facebook_username;
    delete token.links.repos_url;
    delete token.links.bitcointalk_thread_identifier;

    delete token.market_data.ath;
    delete token.market_data.ath_change_percentage;
    delete token.market_data.ath_date;
    delete token.market_data.atl;
    delete token.market_data.atl_change_percentage;
    delete token.market_data.atl_date;
    delete token.market_data.fully_diluted_valuation;
    delete token.market_data.high_24h;
    delete token.market_data.low_24h;
    delete token.market_data.price_change_24h_in_currency;
    delete token.market_data.price_change_percentage_1h_in_currency;
    delete token.market_data.price_change_percentage_24h_in_currency;
    delete token.market_data.price_change_percentage_7d_in_currency;
    delete token.market_data.price_change_percentage_14d_in_currency;
    delete token.market_data.price_change_percentage_30d_in_currency;
    delete token.market_data.price_change_percentage_60d_in_currency;
    delete token.market_data.price_change_percentage_200d_in_currency;
    delete token.market_data.price_change_percentage_1y_in_currency;
    delete token.market_data.market_cap_change_24h_in_currency;
    delete token.market_data.market_cap_change_percentage_24h_in_currency;

    // Deleting unwanted currency prices
    for(let currency in token.market_data.current_price){
      if(!(currency === "inr" || currency === "usd" || currency === "eur" || currency === "btc" || currency === "eth" || currency === "gbp")){
        delete token.market_data.current_price[currency];
        delete token.market_data.market_cap[currency];
        delete token.market_data.total_volume[currency];
      }
    }


    // if(user){
    //     const fetchedUser = await User.findById(user.id);
    //     token.iswatchlisted =  fetchedUser.watchlist.includes(token.id); 
    // }

    res.status(200).json(token);

  } catch (error) {
    console.error(error.message);
    res.status(500).json({error: "Some error occured"});
  }
});


// Route 4: Get the active investments/ portfolio of the user. For each token in the db, fetch their live prices

router.get("/fetchactive", fetchUser,  async (req, res) => {
  try {
    const tokens = await Active.find({ user: req.user.id }).lean();
    let tokenIds = [];

    let portfolioValue = 0, totalInvested = 0, totalReturns=0 , returnsPercentage=0;

    for (let i = 0; i < tokens.length; i++) {
      tokenIds.push(encodeURIComponent(tokens[i].token_id));
    }
    
    const queryIds = tokenIds.join(",");
    console.log(`ids=${queryIds}`);

    const url = `https://api.coingecko.com/api/v3/simple/price?ids=${queryIds}&vs_currencies=inr&include_24hr_change=true`;
    const response = await fetch(url);
    const tokenData = await response.json();

    for (let i = 0; i < tokens.length; i++) {
      const averageCost = await getAverageCost(req.user.id, tokens[i].token_id);
      tokens[i].averageCost = averageCost;      
      let id = tokens[i].token_id; 
      tokens[i].price = tokenData[id];

      // console.log("priceee", tokenData[id])

      portfolioValue += tokens[i].quantity * tokenData[id].inr;
      totalInvested += tokens[i].quantity * tokens[i].averageCost;
    }

    totalReturns = portfolioValue - totalInvested;
    returnsPercentage = (totalReturns/ totalInvested) * 100;


    res.json({portfolioValue,totalInvested, totalReturns, returnsPercentage,tokens});
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some error occured (Active Tokens)");
  }
});

// Route 5: Get the transaction history of the investments. Login Required.
router.get("/fetchtransactions", fetchUser,  async (req, res) => {
  try {
    const transactions = await Transactions.find({ user: req.user.id }).sort("-txn_timestamp");
    res.json(transactions);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some error occured");
  }
});


// Route 6: Get all the required details of a particular token w.r.t the current user. Login required.

router.get("/fetchdetails", fetchUser,  async (req, res) => {
  try {
    const {token_id} = req.query;
    const activeTokens = await Active.find({ user: req.user.id, token_id: token_id}).lean();
    const transactions = await Transaction.find({ user: req.user.id, token_id: token_id}).sort("-txn_timestamp").lean();

    console.log("blafs" ,activeTokens);
    // console.log("blafs txns" ,transactions);

    // Adding average token cost
    // for (let i = 0; i < activeTokens.length; i++) {
    if(activeTokens.length > 0){
      const averageCost = await getAverageCost(req.user.id, activeTokens[0].token_id);
      activeTokens[0].averageCost = averageCost;      
    }
    // }

    const fetchedUser = await User.findById(req.user.id);
    const iswatchlisted =  fetchedUser.watchlist.includes(token_id); 

    // console.log(req.params.symbol);
    res.json({activeTokens, transactions, iswatchlisted});
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some error occured while fetching details");
  }
});


const getAverageCost = async(user, token_id) =>{
  const transactions = await Transaction.find({user:user, token_id: token_id});
  let quantitySum = 0;
  let priceSum = 0;
  // console.log({transactions});
  transactions.forEach(transaction => {
    quantitySum += transaction.quantity;
    // console.log("Fds", quantitySum);
    priceSum += transaction.price * transaction.quantity;
  });
  // console.log("token id-", token_id, "price-", priceSum , " qty-", quantitySum);
  return (priceSum / quantitySum);
}


module.exports = router;
