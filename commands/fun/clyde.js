const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

class ClydeCommand extends Command {
	constructor() {
		super('clyde', {
			aliases: ['clyde'],
			category: 'Fun',
			description: {
				content: 'write something with clyde bot (FAKE!!)',
				usage: 'clyde <text>',
				example: ['clyde hello']
			},
			args: [
				{
					id: 'text',
					match: 'content',
					prompt: {
						start: `what text do you want to appear?`
					}
				}
			]
		});
	}

	async exec(msg, { text }) {
		const data = await fetch(
			`https://nekobot.xyz/api/imagegen?type=clyde&text=${text}`
		).then(res => res.json());

		const embed = new MessageEmbed()
			.setTitle('Clyde')
			.setImage(data.message)
			.setFooter(msg.author.username)
			.setColor('BLUE')
			.setDescription(
				`[Click here if the image failed to load.](${data.message})`
			);

		msg.util.send(embed);
	}
}

module.exports = ClydeCommand