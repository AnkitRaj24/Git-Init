const mongoose = require("mongoose");

const document = mongoose.Schema({
  UserID: {
    type: String,
    required: true,
  },
  Documents:[
    {
      Id: String,
      OriginalName:String,
      Name: String,
      Type: String,
    },
  ],
});
const Document = mongoose.model("Document", document);
module.exports =Document;
