const connectToMongo = require("./db");
const express = require('express')
const cors = require('cors');

connectToMongo();

const app = express();
// const port = 5000

const dotenv = require('dotenv');
const path = require('path');

dotenv.config({
  path: path.join(__dirname, '.env'),
});


app.use(cors());
app.use(express.json());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/exchange', require('./routes/exchange'));
app.use('/api/token', require('./routes/token'));

app.get('/', (req, res) => {
  res.send('Hello World!');
})

if(process.env.API_PORT){
  app.listen(process.env.API_PORT, () => {
    console.log(`the-exchange-app listening on port ${process.env.API_PORT}`)
  });
}