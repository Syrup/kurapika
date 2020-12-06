const { Command } = require("discord-akairo");
const tinyurl = require("tinyurl");

class ShortUrlCommand extends Command {
  constructor() {
    super("shorturl", {
      aliases: ["shorturl", "short"],
      cooldown: 100000
    })
    
    this.name = "shorturl";
  }
  
  exec(msg) {
    let args = msg.content.slice(msg.guild.prefix.length).trim().split(/ +/).slice(1)
    
    console.log(args)
    
    let url = args[0]
    
    tinyurl.shorten(url, (res) => {
      msg.util.send(`This: ${res}`)
    }, err => {
      msg.util.send(`Oh no, ${err}`)
    })
  }
}

module.exports = ShortUrlCommand;