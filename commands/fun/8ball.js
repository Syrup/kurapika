const { Command } = require('discord-akairo');

class EightBallCommand extends Command {
	constructor() {
		super('8ball', {
			aliases: ['8ball'],
			category: 'Fun',
			args: [
				{
					id: 'question',
					type: 'string',
					match: 'content',
					prompt: {
						start: 'What is your question?'
					}
				}
			],
			description: {
				content: 'Ask the magical 8ball a question!',
				usage: '<question>',
				example: ['8ball Will Ayush die single?']
			}
		});
	}

	async exec(message) {
		const replies = [
			'Maybe.',
			'Certainly not.',
			'I hope so.',
			'Not in your wildest dreams.',
			'There is a good chance.',
			'Quite likely.',
			'I think so.',
			'I hope not.',
			'I hope so.',
			'Never!',
			'Fuhgeddaboudit.',
			'Ahaha! Really?!?',
			'Pfft.',
			'Sorry, bucko.',
			'Hell, yes.',
			'Hell to the no.',
			'The future is bleak.',
			'The future is uncertain.',
			'I would rather not say.',
			'Who cares?',
			'Possibly.',
			'Never, ever, ever.',
			'There is a small chance.',
			'Yes!'
		];
		const reply = replies[Math.floor(Math.random() * replies.length)];

		return message.util.send(`🎱 ${reply}`);
	}
}

module.exports = EightBallCommand;