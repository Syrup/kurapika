const { Command } = require("discord-akairo");
const Discord = require("discord.js");

class StoreCommand extends Command {
  constructor() {
    super("store",
    {
      aliases: ["store"]
    })
    this.name = "store"
    this.description = "Show store"
    this.usage = "store"
    this.example = "store"
  }
  
  async exec(msg) {
    let item = {
      ability: {
        Sword: {
          
        }
      },
      magic: ["Speed"]
    }
    
    let ec = this.client.db.get(`economy.${msg.guild.id}.${msg.author.id}`)
    
    let em = new Discord.MessageEmbed()
    .setTitle("Store")
    .setDescription(`You currently have \`${ec.money}\` in your Account`)
    
    for(i in item) {
      for(c of item[i]) {
        em.addField(`**${c}** - \`\``)
      }
    }
    
  }
  
}

module.exports = StoreCommand;