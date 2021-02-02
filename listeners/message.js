const { Listener } = require("discord-akairo");
const Alexa = require("alexa-bot-api");
const ai = new Alexa("aw2plm");
const Levels = require("discord-xp");
Levels.setURL(process.env.MONGO_USER && process.env.MONGO_PASS ? `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.iknae.mongodb.net/discord?retryWrites=true&w=majority` : "mongodb://localhost/discord")

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
    
    if(msg.author.bot || !msg.guild) return
    
    let xp = Math.floor(Math.random() * 10) + 1
    let levelUp = await Levels.appendXp(msg.author.id, msg.guild.id, xp)
    
    if(levelUp) {
      let user = await Levels.fetch(msg.author.id, msg.guild.id)
      let msgLevelUp = this.client.config.levelUp
      .replace(/{user}/g, `${msg.author}`)
      .replace(/{server}/g, `${msg.guild}`)
      .replace(/{userTag}/g, msg.author.tag)
      .replace(/{level}/g, user.level)
      
      msg.channel.send(msgLevelUp)
    }
    
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