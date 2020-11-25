const { Command } = require("discord-akairo");

class KickCommand extends Command {
  constructor() {
    super("kick", {
      aliases: ["kick"]
    })
    
    this.name = "kick"
  }
  
  exec(message) {
    let args = message.content.slice(message.guild.prefix.length).trim().split(/ +/).slice(1)
    
    if(!message.member.permissions.has("KICK_MEMBERS")) return message.util.send("bruh, You don't have permissions `KICK_MEMBERS`")
    if(!message.guild.member(this.client.user).permissions.has("KICK_MEMBERS")) return message.util.send("seriously? you don't give me `KICK_MEMBERS` permission")
    
    let m = message.mentions.users.first()
    let user = message.guild.members.resolve(m)
    let me = message.guild.members.resolve(this.client.user)
    
    if(!m) return message.util.send("please mention someone to kick")
    
    let reason = args.slice(2).join(" ")
    
    if(!reason) {
      reason = "No reason"
    }
    
    if(user.id === me.id) return message.util.send("Why you want to kick me?")
    
    if(me.roles.highest.position <= user.roles.highest.position) {
      return message.util.send("I can't kick it maybe because the role is higher than mine")
    }
    
   try {
   user
   .kick(reason)
   .then(() => {
     message.util.send("Successfully kicked "+m.tag)
   })
   } catch (e) {
     message.channel.send(`Cannot kick this user, Because: \`${e.message}\``)
   }
  }
}

module.exports = KickCommand;