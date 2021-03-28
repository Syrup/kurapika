const { Command } = require('discord-akairo');
const { Invert: iv } = require('discord-image-generation');

class InvertCommand extends Command {
	constructor() {
		super('invert', {
			aliases: ['invert', 'iv'],
			category: 'Fun',
			description: {
				content: 'invert colors on image!!',
				usage: 'invert [user]',
				example: ['invert', 'invert @someuser#1234', 'invert someuser']
			},
			args: [
				{
					id: 'user',
					type: 'user',
					default: msg => msg.author
				}
			]
		});
	}

	async exec(msg, { user }) {
		const img = await new iv().getImage(
			user.displayAvatarURL({ format: 'png', size: 2048 })
		);
		return msg.util.send({
			files: [
				{
					attachment: img,
					name: 'invert.png'
				}
			]
		});
	}
}

module.exports = InvertCommand;
