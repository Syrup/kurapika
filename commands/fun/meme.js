const { Command } = require('discord-akairo');

class MemeCommand extends Command {
	constructor() {
		super('meme', {
			aliases: ['meme'],
			category: 'Fun',
			description: {
				content: 'Sends random meme from the best sub-reddits!',
				usage: 'meme',
				example: ['meme']
			}
		});
	}

	async exec(message) {
		const res = await this.client
			.fetch('https://www.reddit.com/user/kerdaloo/m/dankmemer/top/.json?sort=top&t=day&limit=500')
			.then(res => res.json());
		const children = res.data.children[Math.floor(Math.random() * res.data.children.length)];

		const embed = this.client.util
			.embed()
			.setColor('ORANGE')
			.setTitle(children.data.title)
			.setURL(`https://reddit.com${children.data.permalink}`)
			.setImage(children.data.url)
			.setFooter(`👍 ${children.data.ups} | 💬 ${children.data.num_comments}`);

		return message.util.send(embed);
	}
}


module.exports = MemeCommand;