require('dotenv').config();

const { CommandHandler } = require("discord-akairo");
const { prefix } = require("./config.js");
const path = require("path");

const ModClient = require('./core/client.js');
const ModUtil = require("./core/ClientUtil.js");
const express = require("express");
const app = express();
const client = new ModClient();
client.util = new ModUtil();

app.get("/", (req, res) => {
  res.send("Ready!")
})

app.listen(process.env.PORT)
client.login(process.env.TOKEN);