const mongoose = require("mongoose");

// connectToMongo().catch(err => console.log(err));


async function connectToMongo() {
    await mongoose.connect('mongodb://127.0.0.1:27017/exchange-app');
    console.log("Connected to Mongo successfully..");
  
    // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
  }

module.exports = connectToMongo;