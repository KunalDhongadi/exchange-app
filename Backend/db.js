const mongoose = require("mongoose");
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({
  path: path.join(__dirname, '.env'),
});


// connectToMongo().catch(err => console.log(err));

async function connectToMongo() {
  // await mongoose.connect('mongodb://127.0.0.1:27017/exchange-app');
  await mongoose
    .connect(
      process.env.MONGO_ATLAS_URL
    )
    .then(() => {
      console.log("Connected to Mongo successfully..");
    })
    .catch((error) => console.log("MongoError-", error));

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

module.exports = connectToMongo;
