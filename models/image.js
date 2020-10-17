const mongoose = require("mongoose");


const imageSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true
  },

    text: {
      type: String
    }
});

module.exports = mongoose.model("images",imageSchema);
