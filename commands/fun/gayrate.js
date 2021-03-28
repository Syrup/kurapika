const { Command } = require("discord-akairo");
const { MessageEmbed } = require("discord.js");

class GayrateCommand extends Command {
  constructor() {
    super("gayrate", {
      aliases: ['gayrate', "gay"],
      category: "Fun",
      args: [
        {
          id: "member",
          type: 'user',
					prompt: {
						start: _ => `Who?`
					}
        }
      ]
    })
    this.name = "gayrate"
    this.usage = "gayrate <user>"
  }
  
  async exec(message, { member }) {
    const gay = Math.floor(Math.random() * 100)
    
    let em = new MessageEmbed()
    .setTitle(member.username+" gayrate")
    .setDescription(`<a:loading:393852367751086090> Counting..`)
    .setTimestamp()
    .setColor("RANDOM")
    .setFooter(`Req by: ${message.author.tag}`)
    
    const em1 = new MessageEmbed()
    .setTitle(member.username+" gayrate")
    .setDescription(`${member} is ${gay}% 🏳🌈`)
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