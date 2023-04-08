const mongoose = require("mongoose");
const { Schema } = mongoose;

const TransactionSchema = new Schema({
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  symbol:{
    type: String,
    required: true
  },
  name:{
    type : String,
    required : true
  },
  token_id:{
    type: String,
    required: true
  },
  quantity:{
    type: Number,
    required: true
  },
  price:{
    type: Number,
    required: true
  },
  image_url:{
    type:String,
    required: true
  },
  txn_timestamp:{
    type: Date,
    default: Date.now
  }
  

});

module.exports = mongoose.model("transaction", TransactionSchema);