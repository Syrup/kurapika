const { Listener } = require("discord-akairo");
const Alexa = require("alexa-bot-api");
const ai = new Alexa("aw2plm");

module.exports = class MessageListener extends Listener {
  constructor() {
    super("message", {
      emitter: "client",
      event: "message"
    })
  }
  
  async exec(msg) {
    /*
    let afk = msg.member.afk
    let afkID = afk.user.id
    if(afk) {
      msg.member.deleteAfk()
      
      msg.channel.send(`<a:happy:768826021751291954> Welcome back, ${msg.member}`)
    } else if(msg.content.includes(afkID)) {
      msg.channel.send(`Sorry this user is currently AFK\n Reason: \`${afk.reason}\``)
    }
    */
    
    
    let channelID = this.client.db.get(`chat.${msg.guild.id}`);
    
    let channel = msg.guild.channels.cache.get(channelID)
    
    if(!channel) return
    
    if(!msg.channel.id === channelID) return
    
    if(msg.channel.id === channelID) {
      if(msg.author.bot) return
      let content = msg.content
      
      const reply = await ai.getReply(content)
      
      msg.channel.send(reply)
    }
    
  }
  
}