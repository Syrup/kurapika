const { Command } = require("discord-akairo");

class BanCommand extends Command {
  constructor() {
    super("ban", {
      aliases: ["ban"]
    })
    
    this.name = "ban"
  }
  
  exec(message) {
    let args = message.content.slice(message.guild.prefix.length).trim().split(/ +/).slice(1)
    
    if(!message.member.permissions.has("BAN_MEMBERS")) return message.util.send("bruh, You don't have permissions `BAN_MEMBERS`")
    if(!message.guild.member(this.client.user).permissions.has("BAN_MEMBERS")) return message.util.send("seriously? you don't give me `BAN_MEMBERS` permission")
    
    let m = message.mentions.users.first()
    let user = message.guild.members.resolve(m)
    let me = message.guild.members.resolve(this.client.user)
    
    if(!m) return message.util.send("please mention someone to ban")
    
    let reason = args.slice(2).join(" ")
    
    if(!reason) {
      reason = "No reason"
    }
    
    if(user.id === me.id) return message.util.send("Why you want to ban me?")
    
    if(me.roles.highest.position <= user.roles.highest.position) {
      return message.util.send("I can't ban it maybe because the role is higher than mine")
    }
    
   try {
   user
   .ban(reason)
   .then(() => {
     message.util.send("Successfully banned "+m.tag)
   })
   } catch (e) {
     message.util.send(`Cannot ban this user, Because: \`${e.message}\``)
   }
  }
}

module.exports = BanCommand;