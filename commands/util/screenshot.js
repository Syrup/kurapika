const { Command } = require('discord-akairo');
const fetch = require('node-superfetch');
const url = require('url');

class ScreenshotCommand extends Command {
	constructor() {
		super('screenshot', {
			aliases: ['screenshot', 'ss'],
			category: 'Util',
			description: {
				content: 'Take a screenshot from any website',
				usage: 'screenshot <url>',
				example: ['screenshot https://google.com', 'screenshot mioun.my.id']
			},
			args: [
				{
					id: 'site',
					prompt: {
						start: msg =>
							`${msg.author}, What webpage do you want to take a screenshot of?`
					}
				}
			]
		});
	}

	async exec(msg, { site }) {
		try {
			const parseNSFW = await this.fetchNSFWSites();
			site = /^(https?:\/\/)/i.test(site) ? site : `http://${site}`;
			let parsed = url.parse(site);
			if (parseNSFW.some(u => u === parsed.host) && !msg.channel.nsfw) {
				return msg.util.send('This site is NSFW!');
			} else {
				let { body } = await fetch.get(
					`https://image.thum.io/get/width/1920/crop/620/noanimate/${site}`
				);
				return msg.util.send({
					files: [
						{
							attachment: body,
							name: 'screenshot.png'
						}
					]
				});
			}
		} catch (e) {
			if (e.status === 404)
				return msg.util.send('Website not found! invalid URL?');
			msg.say(e.message);
		}
	}

	async fetchNSFWSites() {
		const { text } = await fetch.get(
			'https://raw.githubusercontent.com/blocklistproject/Lists/master/porn.txt'
		);
		let NSFWSites = text
			.split('\n')
			.filter(site => site && !site.startsWith('#'))
			.map(site => site.replace(/^(0.0.0.0 )/, '')); // eslint-disable-line no-control-regex
		return NSFWSites;
	}
}

module.exports = ScreenshotCommand;
