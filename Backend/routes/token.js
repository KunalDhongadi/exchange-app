const express = require("express");
var fetchUser = require("../middleware/fetchuser");
const User = require("../models/User");
const Active = require("../models/Active");
const Transaction = require("../models/Transaction");
const router = express.Router();

const { body, validationResult } = require("express-validator");

// Route 1: (Post) Buying the stock
router.post("/buy",
    fetchUser,
    [
    body("symbol", "Enter a symbol").exists(),
    body("name", "Enter name").exists(),
    body("token_id", "Enter token_id").exists(),
    body("quantity", "Enter quantity").exists(),
    body("price", "Enter price").exists(),
    body("image_url", "image url is required").exists(),
    ],
    async (req, res) => {
        try {
            const {symbol,token_id, name, quantity, price, image_url} = req.body;
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const fetchedUser = await User.findById(req.user.id);
            const availableCash = fetchedUser.cash;
            const totalValue = parseFloat(quantity) * parseFloat(price);
            // console.log({availableCash, totalValue});
            if(totalValue > availableCash){
                return res.status(400).json({success:false, error:"You do not have enough balance"});
            }

            let activeSymbol = await Active.findOne({ user: req.user.id, token_id: token_id });
            // console.log(activeSymbol);
            if (activeSymbol) {
                // Update the existing record with the new quantity and total spent
                activeSymbol.quantity += quantity;
                await activeSymbol.save();
            } else {
                // Create a new record
                activeSymbol = new Active({
                    user: req.user.id,
                    symbol: symbol,
                    name: name,
                    token_id: token_id,
                    quantity: quantity,
                    image_url: image_url
                });
                await activeSymbol.save();
            }


            // Add this to transaction
            const transaction = new Transaction({
                user: req.user.id,
                symbol: symbol,
                name: name,
                token_id: token_id,
                quantity: quantity,
                price: price,
                image_url: image_url
            });
            await transaction.save();

            // Update INR (cash) balance for user
            
            fetchedUser.cash = fetchedUser.cash - totalValue;
            await fetchedUser.save();
        
            res.json({success: true, details:{name, quantity, price, totalValue}});
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Some error occured while buying the token");
        }
});



// Route 2: (Post) Selling the stock
router.post("/sell",
    fetchUser,
    [
    body("symbol", "Enter a symbol").exists(),
    body("name", "Enter name").exists(),
    body("quantity", "Enter quantity").exists(),
    body("price", "Enter price").exists()
    ],
    async (req, res) => {
        try {
            const {symbol, name, token_id, quantity, price, image_url} = req.body;
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const user = req.user.id;


            // Find the active stock with the given symbol for the user
            let active = await Active.findOne({ user: user, token_id: token_id });
            // console.log("active", active);
            if (!active) {
                return res.status(404).json({success:false, error: `You do have any sufficient quantity to sell.` });
            }

            // Check if the user has enough quantity to sell
            if (active.quantity < parseFloat(quantity)) {
                return res.status(400).json({success:false, error: 'Insufficient quantity to sell.' });
            }

            // Calculate the new quantity and total spent
            const newQuantity = active.quantity - parseFloat(quantity);

            // Update the active stock document
            active.quantity = newQuantity;
            if (newQuantity === 0) {
                await active.deleteOne();
            } else {
                await active.save();
            }

            // Add this to transaction
            const transaction = new Transaction({
                user: user,
                symbol: symbol,
                name:name,
                token_id: token_id,
                quantity: quantity * -1,
                price: price,
                image_url: image_url
            });
            await transaction.save();

            // Update INR (cash) balance for user
            const fetchedUser = await User.findById(req.user.id);
            fetchedUser.cash = fetchedUser.cash + (parseFloat(quantity) * parseFloat(price));
            await fetchedUser.save();

            res.json({success: true, details:{name, quantity, price, totalValue:parseFloat(quantity) * parseFloat(price)}});
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Some error occured while selling the token.");
        }
});


// Route 3: (Post) Watchlisting the stock. Pass token_id as symbol
router.post("/watchlist",
    fetchUser,
    [body("symbol", "Enter a symbol").exists()],
    async (req, res) => {
        try{
            const {symbol} = req.body;
            const user = req.user.id;
            const userObj = await User.findById(user);
            
            // Check if already watchlisted
            let watchlisted = false;
            let message = "";
            if(userObj.watchlist && userObj.watchlist.includes(symbol)){
                userObj.watchlist.pull(symbol);
                watchlisted = false;
                message = "Token removed from the watchlist."
            }else{
                userObj.watchlist.push(symbol);
                watchlisted = true;
                message = "Token added to the watchlist."
            }
            await userObj.save();
            res.json({watchlisted, message});
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Some error occured while watchlisting the token.");
        }
});


// Route 4: (Post) Buying the stock
router.post("/addholding",
    fetchUser,
    [
    body("symbol", "Enter a symbol").exists(),
    body("name", "Enter name").exists(),
    body("token_id", "Enter token_id").exists(),
    body("quantity", "Enter quantity").exists(),
    body("image_url", "image url is required").exists()
    ],
    async (req, res) => {
        try {
            const {symbol,token_id, name, quantity, price, image_url, timestamp} = req.body;
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const fetchedUser = await User.findById(req.user.id);
            const totalValue = parseFloat(quantity) * parseFloat(price);
            // console.log({availableCash, totalValue});
            // if(totalValue > availableCash){
            //     return res.status(400).json({success:false, error:"You do not have enough balance"});
            // }

            let activeSymbol = await Active.findOne({ user: req.user.id, token_id: token_id });
            // console.log(activeSymbol);
            if (activeSymbol) {
                // Update the existing record with the new quantity and total spent
                activeSymbol.quantity += quantity;
                await activeSymbol.save();
            } else {
                // Create a new record
                activeSymbol = new Active({
                    user: req.user.id,
                    symbol: symbol,
                    name: name,
                    token_id: token_id,
                    quantity: quantity,
                    image_url: image_url
                });
                await activeSymbol.save();
            }


            // Add this to transaction
            const transaction = new Transaction({
                user: req.user.id,
                symbol: symbol,
                name: name,
                token_id: token_id,
                quantity: quantity,
                price: price,
                image_url: image_url
            });
            await transaction.save();
        
            res.json({success: true, details:{name, quantity, price, totalValue}});
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Some error occured while buying the token");
        }
});



module.exports = router;
