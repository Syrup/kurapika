const { Command } = require("discord-akairo");
const Discord = require("discord.js");
const fs = require("fs");

class HelpCommand extends Command {
  constructor() {
    super("help", {
      aliases: ["help"]
    })
  }
  
  exec(message) {
    let categories = fs.readdirSync("./commands");
    let col = new Discord.Collection()
    
    categories.forEach(category => {
      
      col[category] = [];
      
      let commands = fs.readdirSync(`./commands/${category}`)
      commands.forEach(cmd => {
        
        if(!require(`/home/runner/discord-bot-template/commands/${category}/${cmd}`)) return;
        
        
        let command = new (require(`/home/runner/discord-bot-template/commands/${category}/${cmd}`))
        let name = command.name
        
        col[category].push(name)
        
      })
     
      
      let em = new Discord.MessageEmbed()
        .setTitle("Modcord Help")
        .addField(`${category}: `, name)
        
        message.util.send(em)
      
    })
    
  }
}

module.exports = HelpCommand;