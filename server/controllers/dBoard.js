const User = require('../models/user.js')
const { v4: uuidv4 } = require('uuid');
const fs = require("fs");
const path = require("path");
const getApplications = async (req, res) => {
  const { UserID } = req.query;
   try {
     const todos = await User.find({ UserID });
     res.send(todos)
     
   } catch (error) {
     return console.log(error)
   }
}

const addUser = async (req, res) => {
  
  const { UserID, Employer, Position,Salary, Link, ApplyDate, Stage } = req.body;

  if (req.file) {
    var Resume = req.file.filename;
    console.log(Resume)
  }
  
  console.log("Request made")
  console.log(UserID);
  console.log(req.file);
  try {
    let user = await User.findOne({ UserID });

    if (user) {
      user.Applications.push({
        Id: uuidv4(),
        Employer,
        Position,
        Salary,
        Link,
        ApplyDate,
        Stage,
        Resume,
      });

      await user.save();
      console.log("New Application Added to existing user");
      res.send("New Application Added to existing user");
    } else {
      const newUser = new User({
        UserID,
        Applications: [
          {
            Id: uuidv4(),
            Employer,
            Position,
            Salary,
            Link,
            ApplyDate,
            Stage,
            Resume,
          },
        ],
      });
      await newUser.save();
      console.log("New User Created with Application");
      res.send("New User Created with Application");
    }
  } catch (error) {
    console.error("Error adding application:", error);
    res.status(500).send("Error adding application");
  }
};

const deleteApplication = async (req, res) => {
  const { UserId, ApplicationId,Resume } = req.params;
  try {
      
      await User.updateOne(
        { UserID: UserId },
        { $pull: { Applications: { Id: ApplicationId } } }
      );
       const filePath = path.join(__dirname, "..", "Resume", Resume);

       fs.unlink(filePath, (err) => {
         if (err) {
           console.error("Error deleting file from server:", err);
         } else {
           console.log("File deleted from server:");
         }
       });
      res.status(200).send({ message: "Application deleted successfully" });

      //TO DELETE CORRESPONDING RESUME FROM SERVER
     
    } catch (error) {
      res
        .status(500)
        .send({ error: "An error occurred while deleting the application" });
    }
}

module.exports = { getApplications, addUser,deleteApplication };
