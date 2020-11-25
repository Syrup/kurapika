const { Command } = require("discord-akairo");
const ms = require("parse-ms");

class WorkCommand extends Command {
  constructor() {
    super("work", {
      aliases: ["work", "w"],
      cooldown: 3
    })
    
    this.name = "work"
  }
  
  exec(msg) {
    let cold = this.client.db.get(`economy.${msg.guild.id}.${msg.author.id}.cooldown`)
    let timeout = 60000;
    let cooldown = timeout - (Date.now() - cold) > 0
    if(cooldown) {
      let time = ms(cooldown)
      
      msg.util.send(`Please wait until ${time.minute}m ${time.second}s because you have been work`)
    } else {
      let earn = Math.floor(Math.random() * 500) + 1
      msg.util.send(`You worked and earn ${earn}`)
    }
    
    this.client.db.set(`economy.${msg.guild.id}.${msg.author.id}.cooldown`, Date.now())
  }
}

module.exports = WorkCommand