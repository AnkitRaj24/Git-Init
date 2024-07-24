const mongoose = require("mongoose");

const user = mongoose.Schema({
  UserID: {
    type: String,
    required: true,
  },
  Applications: [
    {
      Id: String,
      Employer: String,
      Position: String,
      Link: String,
      ApplyDate:String,
      Stage: String,
      Salary: String,
      Resume: String,
    },
  ],
});
const User = mongoose.model("User",user);
module.exports = User;
