const { Command } = require("discord-akairo");
const Discord = require("discord.js")

class AvatarCommand extends Command {
  constructor() {
    super("avatar", {
      aliases: ["avatar", "ava", "pfp"]
    })
    
    this.name = "avatar"
    this.usage = "avatar <user>"
    this.example = "avatar Kurapika"
    this.description = "Get your / member avatar"
  }
  
  async exec(msg) {
    let args = msg.content
    .slice(msg.guild.prefix)
    .trim()
    .split(/ +/)
    .slice(1)
    
    
    let user = await msg.mentions.users.first()
    
    let em = new Discord.MessageEmbed()
    .setFooter("Req by: "+msg.author.tag)
    
    if(!user && args[0]) {
      user = await this.client.util.getMember(msg, args.join(" "))
      em.setAuthor(`${user.user.tag} Avatar`, user.user.displayAvatarURL({ dynamic: true }))
      em.setImage(user.user.displayAvatarURL({ dynamic: true, size: 1024 }))
    } else if(user) {
      em.setAuthor(`${user.tag} Avatar`, user.displayAvatarURL({ dynamic: true }))
      .setImage(user.displayAvatarURL({ dynamic: true, size: 1024 }))
    } else {
      em.setAuthor(`${msg.author.tag} Avatar`, msg.author.displayAvatarURL({ dynamic: true }))
      .setImage(msg.author.displayAvatarURL({ dynamic: true, size: 1024 }))
    }
    
    msg.util.send(em)
    
  }
  
}

module.exports = AvatarCommand;