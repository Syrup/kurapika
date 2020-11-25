const { Command } = require("discord-akairo");
const { MessageEmbed } = require("discord.js");

class GayrateCommand extends Command {
  constructor() {
    super("gayrate", {
      aliases: ['gayrate', "gay"]
    })
    this.name = "gayrate"
  }
  
  async exec(message) {
    const user = message.mentions.users.first()
    
    
    if(!user) return message.util.send("Mention Someone")
    
    const gay = Math.floor(Math.random() * 100)
    
    let em = new MessageEmbed()
    .setTitle(user.username+" gayrate")
    .setDescription(`<a:loading:393852367751086090> Counting..`)
    .setTimestamp()
    .setColor("RANDOM")
    .setFooter(`Req by: ${message.author.tag}`)
    
    const em1 = new MessageEmbed()
    .setTitle(user.username+" gayrate")
    .setDescription(`${user} is ${gay}% 🏳🌈`)
    .setTimestamp()
    .setColor("RANDOM")
    .setFooter(`Req by: ${message.author.tag}`)
    
    
    const msg = await message.util.send(em)
    
    setTimeout(() => {
      msg.edit(em1)
    }, 5000)
  }
}

module.exports = GayrateCommand;