const { Listener } = require('discord-akairo');
const Discord = require("discord.js");

module.exports = class ReadyListener extends Listener {
	constructor() {
		super('guildCreate', {
			emitter: 'client',
			event: 'guildCreate'
		});
	}

	async exec(guild) {
	  let em = new Discord.MessageEmbed()
	  .setTitle("Guild Joined")
	  .addFields({
	    name: '<a:happy:768826021751291954> | Name: ',
	    value: guild.name,
	    inline: true
	  }, {
	    name: "<a:happy:768826021751291954> | Member: ",
	    value: guild.memberCount,
	    inline: true
	  }, {
	    name: `${this.client.util.emojis.happy} | Owner: `,
	    value: guild.owner.user.tag,
	    inline: false
	  }, {
	    name: `${this.client.util.emojis.happy} | Owner ID: `,
	    value: guild.owner.id,
	    inline: true
	  }, {
	    name: "<a:happy:768826021751291954> | Guild ID: ",
	    value: guild.id,
	    inline: false
	  })
	  .setFooter(`Total guilds ${this.client.guilds.cache.size}`)
	  .setColor("RANDOM")
	  
	  for(let a of this.client.config.ownerID) {
	    this.client.users.cache.get(a).send(em)
	  }
	}
};

