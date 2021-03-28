const { Command } = require('discord-akairo');
const { execSync } = require('child_process');

class ExecCommand extends Command {
	constructor() {
		super('exec', {
			aliases: ['exec', 'ex', '$'],
			category: 'Dev',
			ownerOnly: true,
			args: [
				{
					id: 'code',
					match: 'content',
					prompt: {
						start: _ => `Code?`
					}
				}
			]
		});
	}

	async clean(client, text) {
		if (text && text.constructor.name === 'Promise') text = await text;
		if (typeof text !== 'string')
			text = require('util').inspect(text, {
				depth: 1
			});
		const token = RegExp(`${client.token}`, 'gi');
		const mongo_pass = RegExp(`${process.env.MONGO_PASS}`, 'gi');
		const mongo_user = RegExp(`${process.env.MONGO_USER}`, 'gi');

		text = text
			.replace(token, '<TOKEN>')
			.replace(mongo_pass, '<MONGO_PASS>')
			.replace(mongo_user, '<MONGO_USER>');

		return text;
	}

	hastebin(input, c = this.client) {
	  return new Promise((res, rej) => {
	    if(!input) rej("[Error] Missing Input!")
	    c.sourcebin.postBin({ code: input, title: "Eval Results" }).then(link => res(link))
	  })
	}

	async exec(msg, { code }) {
		const m = await msg.util.send(
			`Please Wait.... ${this.client.util.emojis.loading_dc}`
		);

		try {
			const executed = execSync(code).toString();
			const clean = await this.clean(this.client, executed);
			if (clean.length > 2000) m.edit(await this.hastebin(clean));
			else
				m.edit(`\`\`\`js\n${clean}\n\`\`\`\n⏰ ${new Date() - m.createdAt}ms`);
		} catch (err) {
			m.edit(
				`\`ERROR\` \`\`\`\n${await this.clean(
					this.client,
					err.message
				)}\n\`\`\`\n⏰ ${new Date() - m.createdAt}ms`
			);
		}
	}
}

module.exports = ExecCommand;
