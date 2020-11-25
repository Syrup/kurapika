const { Command } = require("discord-akairo");
const Discord = require("discord.js");
const fetch = require("node-superfetch");

class HugCommand extends Command {
  constructor() {
    super("hug", {
      aliases: ["hug"]
    })
    
    this.name = "hug"
  }
  
  async exec(msg) {
    let user = msg.mentions.users.first()
    if(msg.author.id === user.id) return msg.util.send("Hug yourself ❤")
    if(!user) return msg.util.send("Mention Someone");
    
    const { body: hug } = await fetch.get("https://nekos.life/api/hug");
    
    let em = new Discord.MessageEmbed()
    .setTitle("Hug ❤")
    .setDescription(`${msg.author.tag} Hug ${user.tag}`)
    .setImage(hug.url)
    
    return msg.util.send(em)
    
  }
}

module.exports = HugCommand;