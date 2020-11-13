const { Structures } = require('discord.js');
const moment = require("moment");

Structures.extend('GuildMember', GuildMember => {
    class GuildMemberExt extends GuildMember {
        constructor(...args) {
            super(...args);
        }
    
    get afk() {
      return this.getAfk()
    }
    
    getAfk() {
      return this.client.db.get(`afk.${this.guild.id}.${this.id}`)
    }
    
    setAfk(reason) {
      
      if(!reason) return TypeError("No Reason provided");
      
      this.client.db.set(`afk.${this.guild.id}.${this.id}`, reason)
    }
    
    setAfkDate() {
      let date = new Date();
      date = moment.utc(date).format("DD - MM - YYYY | hh:mm:ss A")
      
      this.client.db.set(`afk.${this.guild.id}.${this.id}.date`, date)
    }
    
    getAfkDate() {
      this.client.db.get(`afk.${this.guild.id}.${this.id}.date`)
    }
    
    deleteAfk() {
      this.client.db.delete(`afk.${this.guild.id}.date`)
      
      this.client.db.delete(`afk.${this.guild.id}.${this.id}`)
    }
  }

return GuildMemberExt;
})