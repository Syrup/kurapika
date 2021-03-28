const { Command } = require('discord-akairo');
const { Triggered: tg } = require('discord-image-generation');

class TriggeredCommand extends Command {
	constructor() {
		super('triggered', {
			aliases: ['triggered', 'tg'],
			category: 'Fun',
			description: {
				content: 'Triggered!!',
				usage: 'triggered [user]',
				example: ['triggered', 'triggered @someuser#1234', 'triggered someuser']
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
		const img = await new tg().getImage(
			user.displayAvatarURL({ format: 'png' })
		);
		return msg.util.send({
			files: [
				{
					attachment: img,
					name: 'triggered.gif'
				}
			]
		});
	}
}

module.exports = TriggeredCommand;
