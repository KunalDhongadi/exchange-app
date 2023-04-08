const mongoose = require("mongoose");
const { Schema } = mongoose;

const ActiveSchema = new Schema({
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  symbol:{
    type: String,
    required: true
  },
  name:{
    type:String,
    required: true
  },
  token_id:{
    type:String, 
    required :true
  },
  quantity:{
    type: Number,
    required: true
  },
  image_url:{
    type:String,
    required: true
  }
});

module.exports = mongoose.model("active", ActiveSchema);