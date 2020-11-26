const { Command } = require('discord-akairo');
const fetch = require('node-fetch');
const Akairo = require("discord-akairo");
const Discord = require('discord.js');
const axios = require("axios");

class EvalCommand extends Command {
	constructor() {
		super('eval', {
			aliases: ['eval', 'e', 'ev'],
			ownerOnly: true
		});
		this.name = "eval"
	}

	async clean(client, text) {
		if (text && text.constructor.name == 'Promise') text = await text;
		if (typeof text !== 'string')
			text = require('util').inspect(text, {
				depth: 1
			});
			
			const token = RegExp(`/${client.token}/g`)
			const mongo_pass = RegExp(`/${process.env.MONGO_PASS}/g`)
			const mongo_user = RegExp(`/${process.env.MONGO_USER}/g`)
			
		text = text
			.replace(/`/g, '`' + String.fromCharCode(8203))
			.replace(/@/g, '@' + String.fromCharCode(8203))
			.replace(client.token, '<TOKEN>')
			.replace(process.env.MONGO_PASS, "<MONGO_PASS>")
			.replace(process.env.MONGO_USER, "<MONGO_USER>");

		return text;
	}

	hastebin(input, extension) {
		return new Promise(function(res, rej) {
			if (!input) rej('[Error] Missing Input');
			fetch('https://hasteb.in/documents', {
				method: 'POST',
				body: input
			})
				.then(res => res.json())
				.then(body => {
					res(
						'https://hasteb.in/' +
							body.key +
							(extension ? '.' + extension : '')
					);
				})
				.catch(e => rej(e));
		});
	}

	async exec(message) {
	  let args = message.content.slice(message.guild.prefix.length).trim().split(/ +/).slice(1)
		let code = args.join(" ")
		try {
			const evaled = eval(code);
			const clean = await this.clean(this.client, evaled);
			if (clean.length > 2000)
				message.util.send(await this.hastebin(clean));
			else message.util.send(`\`\`\`js\n${clean}\n\`\`\``);
		} catch (err) {
			message.util.send(
				`\`ERROR\` \`\`\`xl\n${await this.clean(
					this.client,
					err
				)}\n\`\`\``
			);
		}
	}
}

module.exports = EvalCommand;
