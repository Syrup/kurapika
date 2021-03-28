const { Command } = require('discord-akairo');
const Discord = require('discord.js');

class AvatarCommand extends Command {
	constructor() {
		super('avatar', {
			aliases: ['avatar', 'ava', 'pfp'],
			category: 'General',
			description: {
				content: 'Show you / user avatar',
				usage: 'avatar [user]',
				example: ['avatar', 'avatar kurapika']
			},
			args: [
				{
					id: 'user',
					type: 'user',
					default: m => m.author
				}
			]
		});
	}

	async exec(msg, { user }) {
		let em = new Discord.MessageEmbed().setFooter('Req by: ' + msg.author.tag)
		.setAuthor(
			`${user.tag} Avatar`,
			user.displayAvatarURL({ dynamic: true, format: "png" })
		)
		.setImage(user.displayAvatarURL({ dynamic: true, size: 1024, format: "png" }))

		msg.util.send(em);
	}
}

module.exports = AvatarCommand;