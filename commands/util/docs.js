const { Command } = require('discord-akairo');
const fetch = require('node-superfetch');
const qs = require('querystring');

class DocsCommand extends Command {
	constructor() {
		super('docs', {
			aliases: ['docs']
		});
		
		this.name = "docs"
	}

	async exec(msg) {
		let args = msg.content.split(" ").slice(
			this.client.commandHandler.prefix(msg) + 4
		);

		const SOURCES = [
			'stable',
			'master',
			'rpc',
			'commando',
			'akairo',
			'akairo-master',
			'11.5-dev'
		];

		if (args.length < 1) return msg.util.send('No query provided');
		let source = SOURCES.includes(args.slice(-1)[0])
			? args.pop()
			: 'stable';
		if (source === '11.5-dev') {
			source = `https://raw.githubusercontent.com/discordjs/discord.js/docs/${source}.json`;
		}
		try {
			const queryString = qs.stringify({
				src: source,
				q: args.join(' ')
			});
			const { body: embed } = await fetch.get(
				`https://djsdocs.sorta.moe/v2/embed?${queryString}`
			);
			if (!embed) {
				return msg.util.reply(
					"I couldn't find the requested information. Maybe look for something that actually exists the next time!"
				);
			}
			return msg.util.send({ embed });
		} catch (e) {
			return msg.util.send(
				`Oh no an error occured :( \`${e.message}\` try again later`
			);
		}
	}
}

module.exports = DocsCommand;