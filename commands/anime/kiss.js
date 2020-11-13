const { Command } = require('discord-akairo');
const Discord = require('discord.js');
const fetch = require('node-superfetch');

class KissCommand extends Command {
	constructor() {
		super('kiss', {
			aliases: ['kiss']
		});
		this.name = "kiss"
	}

	async exec(message) {
		let user = message.mentions.users.first();
		
		let args = message.content.slice(this.client.commandHandler.prefix(message).length + 4)
		
		if(!args) return message.util.send("Mention Someoned")

		const { body: kiss } = await fetch.get(
			'https://nekos.life/api/v2/img/kiss'
		);
		
		if(message.author.id === user.id) return message.util.send("Love yourself ❤")
		
		const em = new Discord.MessageEmbed()
			.setTitle('Kiss ❤')
			.setColor(0x34eb3d)
			.setDescription(`UwU ${message.author.tag} kissed ${user.tag}`)
			.setImage(kiss.url);
			
			return message.util.send(em)
	}
}

module.exports = KissCommand;
