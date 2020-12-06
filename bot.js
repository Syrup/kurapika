require('dotenv').config();

const { CommandHandler } = require("discord-akairo");
const { prefix } = require("./config.js");
const path = require("path");

const KurapikaClient = require('./core/KurapikaClient.js');
const KurapikaClientUtil = require("./core/KurapikaClientUtil.js");
const express = require("express");
const app = express();
const client = new KurapikaClient({
  fetchAllMembers: true
});
client.util = new KurapikaClientUtil();

app.get("/", (req, res) => {
  res.send("Ready!")
})

app.listen(process.env.PORT)
client.login(process.env.TOKEN);