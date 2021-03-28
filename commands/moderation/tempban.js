const { Command } = require("discord-akairo")
const ms = require("ms");

class BanCommand extends Command {
  constructor() {
    super("ban", {
      aliases: ["ban"],
      category: "Moderation",
      description: {
        content: "Ban user",
        usage: "ban <[@]user> [reason]",
        example: ["ban @someuser#1234 breaking rules"]
      },
      args: [{
        id: "user",
        type: "member",
        prompt: {
          start: msg => `${msg.author}, Who?`
        }
      }, {
        id: "time",
        prompt: {
          start: msg => `${msg.author}, How long?`
        }
      } ,{
        id: "reason",
        match: "content",
        default: "No Reason"
      }]
    })
  }
  
  exec(message, { user, time, reason }) {
    if(!message.member.permissions.has("BAN_MEMBERS")) return message.util.send("bruh, You don't have permissions `BAN_MEMBERS`")
    if(!message.guild.member(this.client.user).permissions.has("BAN_MEMBERS")) return message.util.send("seriously? you don't give me `BAN_MEMBERS` permission")
    
    const me = message.guild.member(this.client.user)
    time = ms(time)
    reason = reason.split(" ").slice(1).join(" ")
    
    if(user.id === me.id) return message.util.send("Why you want to ban me?")
    
    if(me.roles.highest.position <= user.roles.highest.position) {
      return message.util.send("I can't ban it maybe because the role is higher than mine")
    }
    
   try {
   user
   .ban({ reason })
   .then(() => {
     message.util.send("Successfully banned "+ user.user.tag + "\nReason: " + reason)
   })
   
   setTimeout(() => {
     user
   })
   } catch (e) {
     message.util.send(`Cannot ban this user, Because: \`${e.message}\``)
   }
  }
}

module.exports = BanCommand;