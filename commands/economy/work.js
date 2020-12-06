const { Command } = require("discord-akairo");
const ms = require("parse-ms");

class WorkCommand extends Command {
  constructor() {
    super("work", {
      aliases: ["work", "w"],
      cooldown: 3
    })
    
    this.name = "work"
    this.description = "earn a money"
    this.usage = "work"
    this.example = "work"
  }
  
  exec(msg) {
    let cold = this.client.db.get(`economy.${msg.guild.id}.${msg.author.id}.cooldown`)
    let timeout = 600000;
    let cooldown = timeout - (Date.now() - cold)
    if(cooldown > 0) {
      let time = ms(cooldown)
      
      return msg.util.send(`Please wait until ${time.minutes}m ${time.seconds}s because you have been work`)
    } else {
      let earn = Math.floor(Math.random() * 500) + 1
      msg.member.setMoney(earn)
      msg.util.send(`You worked and earn \`${earn}\``)
    }
    
    this.client.db.set(`economy.${msg.guild.id}.${msg.author.id}.cooldown`, Date.now())
  }
}

module.exports = WorkCommand