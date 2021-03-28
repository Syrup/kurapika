const Discord = require('discord.js');
const { Command } = require('discord-akairo');
const axios = require('axios');

class PinterestCommand extends Command {
	constructor() {
		super('pinterest', {
			aliases: ['pinterest', 'pin', 'pint'],
			category: 'Api',
			description: {
				content: 'Search Image on Pinterest',
				usage: 'pinterest [args]',
				example: ['pinterest doraemon', 'pinterest kurapika']
			},
			args: [
				{
					id: 'key',
					match: 'content',
					prompt: {
						start: 'What are you looking for?'
					}
				}
			]
		});
	}

	async exec(message, { key }) {
		key = encodeURIComponent(key);
		if (!key) return message.util.send('Give me Arguments to search');

		const { data: res } = await axios.get(
			'http://api.fdci.se/sosmed/rep.php?gambar=' + key
		);

		let i = Math.floor(Math.random() * res.length);

		if (!res[i]) i = i + 1;

		key = decodeURIComponent(key);

		let em = new Discord.MessageEmbed()
			.setAuthor(
				key + "on Pinterest",
				'https://assets.stickpng.com/images/580b57fcd9996e24bc43c52e.png'
			)
			.setImage(res[i])
			.setFooter(
				'Powered By: Pinterest\nApi By: FDCI Cyber Security - fdcicyber.org/pinterest-search-image'
			)
			.setTimestamp()
			.setColor('RANDOM');

		message.util.send(em);
	}
}

module.exports = PinterestCommand;
