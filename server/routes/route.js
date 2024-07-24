const express = require("express");
const { getApplications } = require("../controllers/dBoard.js");
const { addUser, deleteApplication } = require("../controllers/dBoard.js");
const { addDocument,getDocuments,deleteDocument,editDocument} = require("../controllers/docController.js");

const upload = require("../middlewares/userMulter.js");
const uploadDocument = require("../middlewares/documentMulter.js");


const route = express.Router();
route.get("/applications", getApplications);
route.post("/add", upload.single("resume"), addUser);
route.delete("/delete/:UserId/:ApplicationId/:Resume", deleteApplication);

route.post("/addDocument", uploadDocument.single("document"), addDocument);
route.get("/getDocuments", getDocuments);
route.delete("/deleteDocument", deleteDocument);
route.patch("/editDocument",editDocument)

module.exports = route;
