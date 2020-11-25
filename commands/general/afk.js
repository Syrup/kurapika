const { Command } = require('discord-akairo');
const Discord = require('discord.js');

class AfkCommand extends Command {
	constructor() {
		super('afk', {
			aliases: ['afk']
		});
		
		this.name = "afk"
	}

	async exec(message) {
	  return message.util.send("Maintenance...")
		let args = message.content
			.slice(this.client.commandHandler.prefix(message).length + 4)
			.split(" ");

		let reason = args.join(' ');

		try {
			let user = message.guild.member(message.author.id);
			user.setAfk(reason);

			let em = new Discord.MessageEmbed()
				.setTitle('AFK ' + user.user.tag)
				.setDescription(`I Seted your AFK: ${reason}`)
				.setColor('RANDOM');

			message.util.send(em);
		} catch (e) {
			message.util.send('Oh no, ' + e.message);
		}
	}
}

module.exports = AfkCommand;
