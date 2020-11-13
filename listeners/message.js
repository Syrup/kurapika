const { Listener } = require('discord-akairo');

module.exports = class MessageListener extends Listener {
	constructor() {
		super('message', {
			emitter: 'client',
			event: 'message'
		});
	}

	exec(message) {
	  let afk = message.mentions.users.first()
	  
	  if(message.content.split(" ").includes(`<@${Object.keys(this.client.db.get(`afk.${message.guild.id}`))[0]}>`) && message.guild.member(afk.id).getAfk()) message.channel.send("Sorry this user is AFK, reason: "+this.client.db.get(`afk.${message.guild.id}.${afk.id}`))
	  
	  if(message.author.id === Object.keys(this.client.db.get(`afk.${message.guild.id}`))[0]) {
	    message.guild.member(message.author.id).deleteAfk()
	    message.channel.send("I removed your AFK")
	  }
	}
};
