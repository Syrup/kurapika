const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');

class HelpCommand extends Command {
	constructor() {
		super('help', {
			aliases: ['help', 'h', '?'],
			category: 'General',
			description: {
				content: 'Show help command',
				usage: 'help [command name]',
				example: ['help', 'help']
			},
			args: [
				{
					id: 'command',
					type: 'commandAlias',
					default: null
				}
			]
		});
	}

	async exec(msg, { command }) {
		const em = new MessageEmbed()
			.setTitle(
				`${this.client.user.username} Help`
			)
			.setDescription(
				`Type \`${msg.guild.prefix}help [command name]\` for more information`
			)
			.setColor('RANDOM')
			.setThumbnail(this.client.user.displayAvatarURL({ format: 'png' }));

		if (command) {
			em.setTitle(
				`${command.categoryID} | ${command}`
			)
				.addFields(
					{
						name: 'Aliases: ',
						value: command.aliases.map(x => `\`${x}\``).join(' - ')
					},
					{
						name: 'Usage: ',
						value: command.description.usage
					},
					{
						name: 'Examples: ',
						value: command.description.example
							.map(x => `${x}`)
							.join('\n')
					}
				)
				.setDescription(command.description.content)
				.setThumbnail(this.client.user.displayAvatarURL({ format: 'png' }))
				.setFooter("Dont include this '<>' or this '[]' and this '|' while typing command", msg.author.displayAvatarURL({ format: 'png', dynamic: true }))
		} else {
			for (let category of this.handler.categories.values()) {
				if (['default'].includes(category.id)) continue;

				em.addField(
					this.client.util.emojis.daimen + ' ' + category.id,
					category
						.filter(x => x.aliases.length > 0)
						.map(x => `\`${x}\``)
						.join(' - ')
				)
				.setFooter(
				`Req by: ${msg.author.tag}`,
				msg.author.displayAvatarURL({ format: 'png', dynamic: true })
			);
			}
		}
		msg.util.send(em);
	}
}

module.exports = HelpCommand;
