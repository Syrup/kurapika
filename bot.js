require('dotenv').config();

const { prefix, ownerID } = require("./config.js");
const path = require("path");
const KurapikaClient = require('./core/KurapikaClient.js');
const express = require("express");
const app = express();
const client = new KurapikaClient({ ownerID }, {
  fetchAllMembers: true,
  disableMentions: "everyone",
  disableEveryone: true
});

app.get("/", (req, res) => {
  res.send("Ready!")
})

app.listen(process.env.PORT)
client.login(process.env.TOKEN);