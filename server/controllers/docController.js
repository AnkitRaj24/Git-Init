const Document = require("../models/documents");
const { v4: uuidv4 } = require("uuid");
const path = require("path");
const fs = require("fs"); // Import the fs module
const addDocument = async (req, res) => {
  const { UserID } = req.body;
  console.log("UserID:", UserID);

  if (req.file) {
    const Name = req.file.filename;
    const OriginalName = req.file.originalname;
    const Type = req.file.mimetype; 
    console.log("File:", req.file);

    try {
      let user = await Document.findOne({ UserID });

      if (user) {
        user.Documents.push({
          Id: uuidv4(),
          OriginalName,
          Name,
          Type,
        });

        await user.save();
        console.log("New Documents Added to existing user");
        res.send("New Document Added to existing user");
      } else {
        const newUser = new Document({
          UserID,
          Documents: [
            {
              Id: uuidv4(),
              OriginalName,
              Name,
              Type,
            },
          ],
        });
        await newUser.save();
        console.log("New User Created with Document");
        res.send("New User Created with Document");
      }
    } catch (error) {
      console.error("Error adding Document:", error);
      res.status(500).send("Error adding Document");
    }
  } else {
    res.status(400).send("No file uploaded.");
  }
};

const getDocuments = async (req,res) => {
     const { UserID } = req.query;
     try {
         const user = await Document.find({ UserID });
         console.log("Found user With Documents",user)
       res.send(user);
     } catch (error) {
       return console.log(error);
     }
}

const deleteDocument = async (req, res) => {
  const { UserID, documentID } = req.query;
  try {
    let user = await Document.findOne({ UserID });

    if (user) {
      const documentIndex = user.Documents.findIndex(
        (doc) => doc.Id === documentID
      );

      if (documentIndex !== -1) {
        const [deletedDocument] = user.Documents.splice(documentIndex, 1);

        // Optionally delete the file from the server if stored locally
        const filePath = path.join(
          __dirname,
          "..",
          "Documents",
          deletedDocument.Name
        );
        fs.unlink(filePath, (err) => {
          if (err) {
            console.error("Error deleting file from server:", err);
          } else {
            console.log("File deleted from server:", deletedDocument.Name);
          }
        });

        await user.save();
        console.log("Document deleted successfully");
        res.send("Document deleted successfully");
      } else {
        res.status(404).send("Document not found");
      }
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    console.error("Error deleting document:", error);
    res.status(500).send("Error deleting document");
  }
};


const editDocument = async (req, res) => {
  const { UserID, documentID, newName } = req.body;

  try {
    let user = await Document.findOne({ UserID });

    if (user) {
      const documentIndex = user.Documents.findIndex(
        (doc) => doc.Id === documentID
      );

      if (documentIndex !== -1) {
        user.Documents[documentIndex].OriginalName = newName;

        await user.save();
        console.log("Document name updated successfully");
        res.send("Document name updated successfully");
      } else {
        res.status(404).send("Document not found");
      }
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    console.error("Error updating document name:", error);
    res.status(500).send("Error updating document name");
  }
};
module.exports = { addDocument,getDocuments,deleteDocument,editDocument};
