const { Command } = require('discord-akairo');
const { Affect: af } = require('discord-image-generation');

class AffectCommand extends Command {
	constructor() {
		super('affect', {
			aliases: ['affect', 'af'],
			category: 'Fun',
			description: {
				content: 'Affect!!',
				usage: 'affect [user]',
				example: ['affect', 'affect @someuser#1234', 'affect someuser']
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
		const img = await new af().getImage(
			user.displayAvatarURL({ format: 'png' })
		);
		return msg.util.send({
			files: [
				{
					attachment: img,
					name: 'affect.png'
				}
			]
		});
	}
}

module.exports = AffectCommand;
