const { Command } = require('discord-akairo');
const fs = require('fs');

class CodeCommand extends Command {
	constructor() {
		super('code', {
			aliases: ['code', 'source'],
			category: 'Util',
			description: {
				content: 'Show the source code for the selected command',
				usage: 'code <command name>',
				example: ['code help']
			},
			args: [
				/*{
        id: "type",
        prompt: {
          start: msg => `${msg.author}, what kind of language do you want to search for? e.g javascript / js / json`
        }
      },*/
				{
					id: 'cmd',
					type: 'commandAlias',
					prompt: {
						start: msg =>
							`${
								msg.author
							}, what command do you want to search for the source code?`
					}
				}
			]
		});
	}

	async exec(msg, { type, cmd }) {
		if (type === 'javascript') type = 'js';
		const code = fs.readFileSync(cmd.filepath, 'utf-8');
		if (code.length > 2048) {
			code = msg.client
				.fetch(msg.client.config.hastebin)
				.then(res => res.json())
				.then(res => {
					msg.client.config.hastebin.split('documents')[0] + body.key + '.js';
				});
		}
		msg.channel.send("This is the code : ")
		msg.util.send(code, { code: 'js' });
	}
}

module.exports = CodeCommand;