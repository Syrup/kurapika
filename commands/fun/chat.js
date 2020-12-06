const { Command } = require("discord-akairo");
const Alexa = require("alexa-bot-api");
const ai = new Alexa("aw2plm");

class ChatCommand extends Command {
  constructor() {
    super("chat", {
      aliases: ["chat"]
    })
    
    this.name = "chat"
    this.description = "enable/disable ChatBot"
    this.usage = "chat <enable|disable> <#channel>"
    this.example = "chat enable #chatbot"
  }
  
  async exec(msg) {
    const args = msg.content.slice(msg.guild.prefix).trim().split(" ").slice(1)
    console.log(args)
    
    if(args[0] === "enable") {
      var id = args[1].replace(/<#/g, "").replace(/>/g, "")
      msg.guild.setChat(id)
      console.log(id)
    }
    else if(args[0] === "disable") {
      msg.guild.deleteChat(id)
    }
  }
}

module.exports = ChatCommand;