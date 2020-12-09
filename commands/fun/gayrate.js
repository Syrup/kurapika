const { Command } = require("discord-akairo");
const { MessageEmbed } = require("discord.js");

class GayrateCommand extends Command {
  constructor() {
    super("gayrate", {
      aliases: ['gayrate', "gay"],
      args: [
        {
          id: "member",
          type: 'string',
					match: 'text',
					limit: 3000,
					prompt: {
						start: msg => `${msg.member}, Who?`
					}
        }
      ]
    })
    this.name = "gayrate"
    this.usage = "gayrate <user>"
  }
  
  async exec(message, { member }) {
    const args = message.content
    .slice(message.guild.prefix)
    .trim()
    .split(/ +/)
    .slice(1)
    
    console.log(member)
    let user;
    
    if(member.startsWith("<@")) {
      user = await this.client.util.getMember(message, member.match(/<@(\d+)>/)[1])
    } else {
      user = await this.client.util.getMember(message, member);
    }
    
    
    
    
    const gay = Math.floor(Math.random() * 100)
    
    let em = new MessageEmbed()
    .setTitle(user.user.username+" gayrate")
    .setDescription(`<a:loading:393852367751086090> Counting..`)
    .setTimestamp()
    .setColor("RANDOM")
    .setFooter(`Req by: ${message.author.tag}`)
    
    const em1 = new MessageEmbed()
    .setTitle(user.user.username+" gayrate")
    .setDescription(`${user.user} is ${gay}% 🏳🌈`)
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